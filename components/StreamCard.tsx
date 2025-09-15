'use client';
import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import ActionRail from './ActionRail';
import ChatOverlay from './ChatOverlay';
import CommitModal from './CommitModal';

export default function StreamCard({ stream }:{ stream: {
  id: string; title: string; creator: string; ticker: string;
  goal: number; raised: number; posterUrl?: string;
}}){
  const [open, setOpen] = useState(false);

  const onCommit = async (amt:number, cur:'SOL'|'USDC') => {
    // TODO: Replace with Anchor client call
    await new Promise(r => setTimeout(r, 750));
    console.log('Committed', { amt, cur, streamId: stream.id });
  };

  const pct = Math.min(100, Math.round((stream.raised/stream.goal)*100));

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
      </div>
  <ActionRail onCommitClick={()=>setOpen(true)} streamId={stream.id} />
      <ChatOverlay streamId={stream.id} />
      <CommitModal open={open} onClose={()=>setOpen(false)} onCommit={onCommit} />
    </section>
  );
}
