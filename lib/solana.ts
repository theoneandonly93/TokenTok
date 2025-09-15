import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Fetch all SPL token accounts for a wallet
export async function getTokenAccounts(owner: PublicKey) {
  const connection = getConnection();
  const resp = await connection.getParsedTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID });
  return resp.value
    .map((acc: any) => {
      const info = acc.account.data.parsed.info;
      return {
        mint: info.mint,
        amount: parseFloat(info.tokenAmount.uiAmountString),
        symbol: undefined, // Optionally resolve symbol elsewhere
      };
    })
    .filter((t: any) => t.amount > 0);
}

// Fetch token prices for a list of mints (mock, replace with real API)
export async function getTokenPrices(mints: string[]): Promise<Record<string, number>> {
  // TODO: Replace with real API call (Birdeye, Jupiter, etc)
  const prices: Record<string, number> = {};
  for (const mint of mints) {
    prices[mint] = 0.01; // mock price
  }
  return prices;
}
'use client';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

export type ClusterEnv = 'devnet'|'mainnet-beta';
export const getCluster = (): ClusterEnv => {
  const env = (process.env.NEXT_PUBLIC_ENV || 'devnet').toLowerCase();
  return env === 'mainnet' ? 'mainnet-beta' : env === 'mainnet-beta' ? 'mainnet-beta' : 'devnet';
};

export const getConnection = () => {
  const cluster = getCluster();
  const endpoint = clusterApiUrl(cluster);
  return new Connection(endpoint, 'confirmed');
};

export const isValidPubkey = (k: string) => {
  try { new PublicKey(k); return true; } catch { return false; }
};
