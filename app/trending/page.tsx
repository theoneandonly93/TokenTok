"use client";
import Link from "next/link";
import Shell from "@/components/Shell";

import { useEffect, useState } from "react";
import { Sparkles, Users, Eye, ArrowLeft } from "lucide-react";
import { fetchTrendingTokens } from "@/utils/trending";
export default function TrendingPage() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTrendingTokens()
      .then(setTokens)
      .catch((e) => setError(e?.message || 'Failed to load tokens'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Shell>
      <div className="h-dvh overflow-y-auto p-4 pt-16">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition mr-2">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="text-yellow-400" /> Trending Tokens
          </h1>
        </div>
        {error ? (
          <div className="text-red-400 text-center py-8">{error}</div>
        ) : loading ? (
          <div className="text-center text-white/70 py-8 animate-pulse">Loading trending tokens...</div>
        ) : tokens.length === 0 ? (
          <div className="text-center text-white/70 py-8">No trending tokens found.</div>
        ) : (
          <ul className="flex flex-col sm:flex-row sm:overflow-x-auto gap-4">
            {tokens.map((token) => (
              <li
                key={token.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 min-w-0 sm:min-w-[320px] w-full sm:w-[340px] shadow-md hover:bg-white/10 transition"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={token.pfp}
                    alt={token.name}
                    className={`w-16 h-16 rounded-full border-4 ${token.live ? 'border-pink-500 animate-pulse' : 'border-zinc-700'}`}
                  />
                  {token.live && (
                    <span className="absolute bottom-0 right-0 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">LIVE</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg text-white truncate">{token.name}</div>
                  <div className="text-xs text-zinc-400 truncate">${token.ticker}</div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-white/80">
                    <span>Price: <span className="font-bold">${token.market.price}</span></span>
                    <span>MC: <span className="font-bold">${token.market.marketCap.toLocaleString()}</span></span>
                    <span>24h Vol: <span className="font-bold">${token.market.volume24h.toLocaleString()}</span></span>
                    <span className="flex items-center gap-1"><Users size={14}/> {token.holders} holders</span>
                    {token.live && (
                      <span className="flex items-center gap-1 text-pink-400"><Eye size={14}/> {token.viewers} viewers</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Shell>
  );
}
// ...existing code ends cleanly here
