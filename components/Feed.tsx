'use client';
import StreamCard from './StreamCard';


import { useEffect, useState } from 'react';

export default function Feed(){
  const [streams, setStreams] = useState<any[]>([]);
  useEffect(() => {
    // TODO: Fetch streams from backend API
    setStreams([]);
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
