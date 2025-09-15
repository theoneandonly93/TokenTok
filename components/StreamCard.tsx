'use client';
import { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import ActionRail from './ActionRail';
import QuickBuyModal from './QuickBuyModal';
import ChatOverlay from './ChatOverlay';
import CommitModal from './CommitModal';
import { fetchMarketInfo, MarketInfo } from '../utils/market';

type Stream = {
  id: string;
  title: string;
  creator: string;
  ticker: string;
  goal: number;
  raised: number;
  posterUrl?: string;
  tokenMint: string;
};

export default function StreamCard({ stream }: { stream: Stream }) {
  const [commitOpen, setCommitOpen] = useState(false);
  const [quickBuyOpen, setQuickBuyOpen] = useState(false);

  const onCommit = async (amt:number, cur:'SOL'|'USDC') => {
    // TODO: Replace with Anchor client call
    await new Promise(r => setTimeout(r, 750));
    console.log('Committed', { amt, cur, streamId: stream.id });
  };


  const pct = Math.min(100, Math.round((stream.raised/stream.goal)*100));
  const [market, setMarket] = useState<MarketInfo | null>(null);

  useEffect(() => {
    fetchMarketInfo(stream.tokenMint).then(setMarket);
  }, [stream.tokenMint]);

  return (
    <section className="relative h-dvh w-full snap-center snap-always">
      <VideoPlayer posterUrl={stream.posterUrl} />
      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-white/90">
          <span className="rounded-full bg-white/20 px-2 py-1 text-xs">${stream.ticker}</span>
          <span className="font-semibold">@{stream.creator}</span>
        </div>
        <h2 className="mb-3 text-lg font-semibold">{stream.title}</h2>
        <div className="mb-2 h-2 w-3/4 overflow-hidden rounded-full bg-white/20">
          <div className="h-full bg-brand" style={{ width: pct + '%' }} />
        </div>
        <p className="text-xs text-white/70">{stream.raised} / {stream.goal} SOL raised</p>
        {market && (
          <div className="text-xs text-white/60 mt-1">
            MC: ${market.marketCap.toLocaleString()} • Vol: ${market.volume24h.toLocaleString()} / 24h • Price: ${market.price}
          </div>
        )}
      </div>
      <ActionRail
        onCommitClick={() => setCommitOpen(true)}
        onQuickBuyClick={() => setQuickBuyOpen(true)}
        streamId={stream.id}
      />
      <ChatOverlay streamId={stream.id} />
      <CommitModal open={commitOpen} onClose={() => setCommitOpen(false)} onCommit={onCommit} />
      <QuickBuyModal
        open={quickBuyOpen}
        onClose={() => setQuickBuyOpen(false)}
        tokenMint={stream.tokenMint}
        ticker={stream.ticker}
      />
    </section>
  );
}
