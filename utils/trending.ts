import { MarketInfo, fetchMarketInfo } from "../utils/market";

export interface TrendingToken {
  id: string;
  name: string;
  ticker: string;
  pfp: string;
  live: boolean;
  tokenMint: string;
  holders: number;
  viewers: number;
}

// Placeholder: Replace with real backend call
export async function fetchTrendingTokens(): Promise<(TrendingToken & { market: MarketInfo })[]> {
  // Example tokens
  const tokens: TrendingToken[] = [
    {
      id: "1",
      name: "SolanaX",
      ticker: "SOLX",
      pfp: "/TokenTok.png",
      live: true,
      tokenMint: "So11111111111111111111111111111111111111112",
      holders: 1234,
      viewers: 87,
    },
    {
      id: "2",
      name: "USDCoin",
      ticker: "USDC",
      pfp: "/TokenTok.png",
      live: false,
      tokenMint: "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1",
      holders: 4321,
      viewers: 0,
    },
  ];
  // Fetch market info for each token
  const withMarket = await Promise.all(
    tokens.map(async (token) => ({
      ...token,
      market: await fetchMarketInfo(token.tokenMint),
    }))
  );
  return withMarket;
}
