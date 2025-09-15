import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getTokenAccounts, getTokenPrices } from '../lib/solana';

export default function PortfolioPage() {
  const { publicKey, connected } = useWallet();
  const [holdings, setHoldings] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHoldings = async () => {
      if (!publicKey) return;
      setLoading(true);
      try {
        const tokens = await getTokenAccounts(publicKey);
        const prices = await getTokenPrices(tokens.map(t => t.mint));
        let value = 0;
        const enriched = tokens.map(t => {
          const price = prices[t.mint] || 0;
          value += t.amount * price;
          return { ...t, price, value: t.amount * price };
        });
        setHoldings(enriched);
        setTotalValue(value);
      } catch (e) {
        setHoldings([]);
        setTotalValue(0);
      }
      setLoading(false);
    };
    if (connected) fetchHoldings();
  }, [publicKey, connected]);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-4 text-lg">Total Value: <span className="font-mono">${totalValue.toFixed(2)}</span></div>
          <div className="space-y-2">
            {holdings.map((h, i) => (
              <div key={h.mint} className="flex items-center justify-between bg-zinc-800 rounded-xl p-3">
                <div>
                  <div className="font-semibold">{h.symbol || h.mint.slice(0,4)+'...'+h.mint.slice(-4)}</div>
                  <div className="text-xs text-zinc-400">{h.mint}</div>
                </div>
                <div className="text-right">
                  <div>{h.amount} <span className="text-xs">{h.symbol}</span></div>
                  <div className="text-xs text-zinc-400">${h.value.toFixed(2)}</div>
                </div>
              </div>
            ))}
            {holdings.length === 0 && <div className="text-zinc-400">No tokens found.</div>}
          </div>
        </>
      )}
    </div>
  );
}
