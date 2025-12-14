import { NextResponse } from 'next/server';

const SYMBOLS = [
    { id: 'nasdaq', symbol: '^IXIC', name: '纳指', type: 'index' },
    { id: 'ashare', symbol: '000001.SS', name: '上证', type: 'index' },
    { id: 'btc', symbol: 'BTC-USD', name: 'BTC', type: 'crypto' },
    { id: 'eth', symbol: 'ETH-USD', name: 'ETH', type: 'crypto' },
];

const TIMEOUT_MS = 5000;

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
        // Tencent (qtimg) API supports batch query
        // Symbols: sh000001 (上证), us.IXIC (Nasdaq), us.DJI (Dow), us.SPX (S&P 500)
        // Mapping:
        // ashare -> sh000001
        // nasdaq -> us.IXIC
        // btc -> N/A (Tencent might not have crypto straightforwardly, or use different code. For now keep separate or find code)
        // Let's use Tencent for stocks and Yahoo fallback for others if Tencent fails or doesn't support.

        const STOCK_MAP: Record<string, string> = {
            'ashare': 'sh000001',
            'nasdaq': 'us.IXIC',
            'sp500': 'us.INX', // Tencent code for S&P might vary, let's try us.INX or leave it.
            // 'btc': 'btc_usd' // Crypto support uncertain, stick to Yahoo/CoinCap for Crypto if improved later.
        };

        const promises = SYMBOLS.map(async (item) => {
            // 1. Tencent API for Stocks (A-Share & US Indices)
            if (STOCK_MAP[item.id]) {
                try {
                    const code = STOCK_MAP[item.id];
                    // qtimg url: http://qt.gtimg.cn/q=sh000001,us.IXIC
                    // We can do individual fetches or batch. Individual is fine for small count.
                    const response = await fetchWithTimeout(`http://qt.gtimg.cn/q=${code}`, {
                        headers: { 'Referer': 'https://finance.qq.com/' },
                        next: { revalidate: 30 }
                    });

                    if (!response.ok) throw new Error('Tencent API failed');

                    // text format: v_sh000001="1:上证指数~2:3360.28..."
                    // A-Share: v_sh000001="51~上证指数~000001~3367.99~3370.40~3356.12~3367.99...~32（涨跌）~0.96（涨跌幅）..."
                    // US Stock: v_us_IXIC="200~纳斯达克~IXIC~19742.77...~3（涨跌）~0.02（涨跌幅）..."
                    // Format varies slightly.
                    // Common pattern: splitted by '~'
                    // Index 1: Name, Index 3: Current Price, Index 31: Change, Index 32: Percent (Check specific indices)

                    const text = await response.text();
                    // Basic parsing
                    const matches = text.match(/="(.*)";/);
                    if (matches && matches[1]) {
                        const parts = matches[1].split('~');
                        if (parts.length > 30) {
                            const name = parts[1];
                            const price = parseFloat(parts[3]);
                            const change = parseFloat(parts[31]);
                            const percent = parseFloat(parts[32]);

                            if (!isNaN(price)) {
                                return {
                                    id: item.id,
                                    name: item.name, // Use local name or parts[1]
                                    symbol: item.symbol,
                                    price,
                                    change,
                                    percent,
                                    type: item.type,
                                    currency: item.id === 'ashare' ? 'CNY' : 'USD'
                                };
                            }
                        }
                    }
                    throw new Error('Tencent API invalid data');
                } catch (error: any) {
                    const isTimeout = error.name === 'AbortError' || error.message.includes('Timeout') || error.code === 'UND_ERR_CONNECT_TIMEOUT';
                    console.warn(`[MarketAPI] Tencent ${item.symbol} fetch failed (${isTimeout ? 'Timeout' : error.message}).`);
                    // Fallback to Yahoo below
                    if (item.id === 'ashare') return errorResult(item); // No yahoo fallback for A-share usually
                }
            }

            // 2. Crypto (CoinCap) or Yahoo Fallback
            // ... (Rest of existing Yahoo/Crypto logic)

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
                console.warn(`[MarketAPI] Yahoo ${item.symbol} fetch failed:`, error instanceof Error ? error.message : error);
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
