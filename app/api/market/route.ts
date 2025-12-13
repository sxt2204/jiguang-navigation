import { NextResponse } from 'next/server';

const SYMBOLS = [
    { id: 'nasdaq', symbol: '^IXIC', name: '纳指', type: 'index' },
    { id: 'ashare', symbol: '000001.SS', name: '上证', type: 'index' },
    { id: 'btc', symbol: 'BTC-USD', name: 'BTC', type: 'crypto' },
    { id: 'eth', symbol: 'ETH-USD', name: 'ETH', type: 'crypto' },
];

const TIMEOUT_MS = 3000;

async function fetchWithTimeout(url: string, options: RequestInit = {}) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        return response;
    } finally {
        clearTimeout(id);
    }
}

export async function GET() {
    try {
        const promises = SYMBOLS.map(async (item) => {
            // Sina API for A-Share and Nasdaq (US Indices)
            if (item.id === 'ashare' || item.id === 'nasdaq') {
                try {
                    const sinaCode = item.id === 'ashare' ? 'sh000001' : 'gb_ixic'; // gb_ixic for Nasdaq
                    const response = await fetchWithTimeout(`http://hq.sinajs.cn/list=${sinaCode}`, {
                        headers: { 'Referer': 'https://finance.sina.com.cn/' },
                        next: { revalidate: 30 }
                    });

                    if (!response.ok) throw new Error('Sina API failed');

                    const text = await response.text();
                    const matches = text.match(/="(.*)";/);

                    if (matches && matches[1]) {
                        const parts = matches[1].split(',');
                        let price = 0;
                        let change = 0;
                        let percent = 0;

                        if (item.id === 'ashare') {
                            // A-Share Format: name, open, prevClose, price, ...
                            const open = parseFloat(parts[1]);
                            const previousClose = parseFloat(parts[2]);
                            price = parseFloat(parts[3]);

                            if (price > 0 && previousClose > 0) {
                                change = price - previousClose;
                                percent = (change / previousClose) * 100;
                            }
                        } else {
                            // US Stock (gb_) Format: name, price, percent, time, change, ...
                            // Example: "纳斯达克,17629.23,-1.69,2025-12-13...,-398.68..."
                            price = parseFloat(parts[1]);
                            percent = parseFloat(parts[2]); // Sina gives percent directly like -1.69
                            change = parseFloat(parts[4]);
                        }

                        // Valid data check
                        if (price > 0) {
                            // console.log(`[MarketAPI] Sina ${item.symbol}:`, { price, change, percent });
                            return {
                                id: item.id,
                                name: item.name,
                                symbol: item.symbol,
                                price,
                                change,
                                percent,
                                type: item.type,
                                currency: 'CNY', // Sina usually US returns in USD implicitly but let's keep consistent or fix later if needed. For display logic.
                            };
                        }
                    }
                    throw new Error('Sina API invalid data');
                } catch (error) {
                    console.error(`Error fetching Sina ${item.symbol}:`, error);
                    // Fallback to Yahoo for Nasdaq if Sina failed? 
                    // If it is ashare, no fallback. If nasdaq, maybe fallback.
                    if (item.id === 'ashare') return errorResult(item);
                }
            }

            // Fallback / Default: Yahoo Finance
            try {
                const response = await fetchWithTimeout(
                    `https://query1.finance.yahoo.com/v8/finance/chart/${item.symbol}?interval=1d&range=1d`,
                    { next: { revalidate: 60 } }
                );

                if (!response.ok) {
                    throw new Error(`Yahoo API error: ${response.status}`);
                }

                const data = await response.json();
                const meta = data.chart.result[0].meta;
                const price = meta.regularMarketPrice;
                const previousClose = meta.previousClose || meta.chartPreviousClose || price;
                let change = meta.regularMarketChange ?? (price - previousClose);
                let percent = meta.regularMarketChangePercent;

                if (percent === undefined || percent === null) {
                    percent = (change / previousClose) * 100;
                }

                if (!Number.isFinite(percent) || Number.isNaN(percent)) {
                    percent = 0;
                }

                return {
                    id: item.id,
                    name: item.name,
                    symbol: item.symbol,
                    price,
                    change,
                    percent,
                    type: item.type,
                    currency: meta.currency,
                };
            } catch (error) {
                // Log only message to reduce noise
                console.error(`Error fetching ${item.symbol}:`, error instanceof Error ? error.message : error);
                return errorResult(item);
            }
        });

        const results = await Promise.all(promises);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
    }
}

function errorResult(item: any) {
    return {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        price: 0,
        change: 0,
        percent: 0,
        type: item.type,
        error: true,
    };
}

export const dynamic = 'force-dynamic';
