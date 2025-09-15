// utils/market.ts
// Fetch price, market cap, and 24h volume for a given token mint

export interface MarketInfo {
  price: number;
  marketCap: number;
  volume24h: number;
}

// Placeholder: Replace with real API call (e.g. Birdeye, Jupiter, or Coingecko)
export async function fetchMarketInfo(tokenMint: string): Promise<MarketInfo> {
  // Example: fetch from Birdeye
  // const res = await fetch(`https://public-api.birdeye.so/public/token/${tokenMint}`);
  // const data = await res.json();
  // return {
  //   price: data.price,
  //   marketCap: data.market_cap,
  //   volume24h: data.volume_24h,
  // };
  return {
    price: 0.01,
    marketCap: 1000000,
    volume24h: 50000,
  };
}
