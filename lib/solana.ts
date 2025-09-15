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
