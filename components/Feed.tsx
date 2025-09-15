'use client';
import StreamCard from './StreamCard';


import { useEffect, useState } from 'react';

export default function Feed(){
  const [streams, setStreams] = useState<any[]>([]);
  useEffect(() => {
    // Demo/test stream for mobile visibility
    setStreams([
      {
        id: 'demo1',
        title: 'Demo Stream: Web3 Launch',
        creator: 'demo_creator',
        ticker: 'DEMO',
        goal: 100,
        raised: 42,
        posterUrl: '/TokenTok.png',
        tokenMint: 'So11111111111111111111111111111111111111112',
      },
    ]);
  }, []);
  return (
    <main className="hide-scrollbar snap-y h-dvh w-full overflow-y-scroll">
      {streams.length === 0 ? (
        <div className="text-zinc-400 p-8 text-center">No live streams yet.</div>
      ) : (
        streams.map(s => <StreamCard key={s.id} stream={s} />)
      )}
    </main>
  );
}
