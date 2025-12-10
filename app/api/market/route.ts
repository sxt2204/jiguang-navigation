import { NextResponse } from 'next/server';

const SYMBOLS = [
    { id: 'nasdaq', symbol: '^IXIC', name: '纳指', type: 'index' },
    { id: 'ashare', symbol: '000001.SS', name: '上证', type: 'index' },
    { id: 'btc', symbol: 'BTC-USD', name: 'BTC', type: 'crypto' },
    { id: 'eth', symbol: 'ETH-USD', name: 'ETH', type: 'crypto' },
];

export async function GET() {
    try {
        const promises = SYMBOLS.map(async (item) => {
            // Special handling for A-Share using Sina API for better accuracy
            if (item.id === 'ashare') {
                try {
                    const response = await fetch('http://hq.sinajs.cn/list=sh000001', {
                        headers: { 'Referer': 'https://finance.sina.com.cn/' },
                        next: { revalidate: 30 }
                    });

                    if (!response.ok) throw new Error('Sina API failed');

                    const text = await response.text();
                    const matches = text.match(/="(.*)";/);

                    if (matches && matches[1]) {
                        const parts = matches[1].split(',');
                        const open = parseFloat(parts[1]);
                        const previousClose = parseFloat(parts[2]);
                        const price = parseFloat(parts[3]);

                        // Valid data check
                        if (price > 0 && previousClose > 0) {
                            const change = price - previousClose;
                            const percent = (change / previousClose) * 100;

                            console.log(`[MarketAPI] Sina ${item.symbol}:`, { price, change, percent });

                            return {
                                id: item.id,
                                name: item.name,
                                symbol: item.symbol,
                                price,
                                change,
                                percent,
                                type: item.type,
                                currency: 'CNY',
                            };
                        }
                    }
                    throw new Error('Sina API invalid data');
                } catch (error) {
                    console.error(`Error fetching Sina ${item.symbol}:`, error);
                    // Fallback to Yahoo if Sina fails? Or just return error.
                    // Let's allow it to fall through to Yahoo logic below if we want fallback, 
                    // but for now, let's just return error or maybe continue to Yahoo?
                    // To keep it simple and robust, let's try Yahoo as fallback if Sina fails.
                    console.log('Falling back to Yahoo for ashare...');
                }
            }

            try {
                const response = await fetch(
                    `https://query1.finance.yahoo.com/v8/finance/chart/${item.symbol}?interval=1d&range=1d`,
                    { next: { revalidate: 60 } }
                );

                if (!response.ok) {
                    throw new Error(`Yahoo API error: ${response.status}`);
                }

                const data = await response.json();

                // Debug log
                console.log(`[MarketAPI] ${item.symbol}:`, JSON.stringify(data?.chart?.result?.[0]?.meta || {}));

                const meta = data.chart.result[0].meta;
                const price = meta.regularMarketPrice;
                const previousClose = meta.previousClose || meta.chartPreviousClose || price; // Fallback to price prevents division by zero if prevClose is missing

                // Prioritize pre-calculated change percent if available
                let change = meta.regularMarketChange ?? (price - previousClose);
                let percent = meta.regularMarketChangePercent;

                if (percent === undefined || percent === null) {
                    percent = (change / previousClose) * 100;
                }

                // Handle NaN or Infinity
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
                console.error(`Error fetching ${item.symbol}:`, error);
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
        });

        const results = await Promise.all(promises);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
    }
}
