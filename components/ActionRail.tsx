'use client';

import { Heart, MessageCircle, Wallet, ShoppingCart } from 'lucide-react';

import { useEffect, useState } from 'react';

interface ActionRailProps {
  onCommitClick: () => void;
  onQuickBuyClick: () => void;
  streamId: string;
}

export default function ActionRail({ onCommitClick, onQuickBuyClick, streamId }: ActionRailProps) {
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    // TODO: Fetch like count from backend
    setLikes(0);
  }, [streamId]);
  const like = () => {
    // TODO: Send like to backend and update count
    setLikes(l => l + 1);
  };
  return (
    <div className="absolute right-2 top-1/3 z-20 flex -translate-y-1/2 flex-col items-center gap-5">
      <button className="flex flex-col items-center" onClick={like}>
        <div className="rounded-full bg-white/20 p-3"><Heart /></div>
        <span className="mt-1 text-xs text-white/80">{likes}</span>
      </button>
      <button onClick={onCommitClick} className="flex flex-col items-center">
        <div className="rounded-full bg-white/20 p-3"><Wallet /></div>
        <span className="mt-1 text-xs text-white/80">Commit</span>
      </button>
      <button onClick={onQuickBuyClick} className="flex flex-col items-center">
        <div className="rounded-full bg-white/20 p-3"><ShoppingCart /></div>
        <span className="mt-1 text-xs text-white/80">Quick Buy</span>
      </button>
      <button className="flex flex-col items-center">
        <div className="rounded-full bg-white/20 p-3"><MessageCircle /></div>
        <span className="mt-1 text-xs text-white/80">Chat</span>
      </button>
    </div>
  );
}
