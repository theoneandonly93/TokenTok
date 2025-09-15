'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Home, PlusCircle, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);
import GoLiveModal from './GoLiveModal';

// ...existing code...
export default function Shell({ children }:{ children: React.ReactNode }) {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [goLiveOpen, setGoLiveOpen] = useState(false);
  const [lastStream, setLastStream] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProfilePhoto(localStorage.getItem('profilePhoto'));
      setProfileName(localStorage.getItem('profileName'));
    }
  }, []);

  return (
    <div className="relative mx-auto h-dvh max-w-screen-sm">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between p-3">
        <div className="pointer-events-auto flex items-center gap-2">
          <Image src="/TokenTok.png" alt="TokenTok Logo" width={28} height={28} className="rounded" />
          <span className="text-sm font-semibold">TokenTok</span>
        </div>
        <div className="pointer-events-auto">
          <WalletMultiButton className="!bg-white/10 !text-white hover:!bg-white/20" />
        </div>
      </header>
      {children}
      <nav className="absolute inset-x-0 bottom-0 z-30 mx-auto mb-2 flex max-w-screen-sm items-center justify-around rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md">
        <Link href="/" className="flex flex-col items-center text-xs"><Home size={18}/>Feed</Link>
        <button onClick={()=>setGoLiveOpen(true)} className="flex flex-col items-center text-xs focus:outline-none"><PlusCircle size={18}/>Go Live</button>
        <Link href="/inbox" className="flex flex-col items-center text-xs">📥 Inbox</Link>
        <Link href="/profile" className="flex flex-col items-center text-xs">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-white/20 mb-1" />
          ) : (
            <User2 size={18} />
          )}
          {profileName ? (
            <span className="truncate max-w-[60px]">{profileName}</span>
          ) : (
            'Profile'
          )}
        </Link>
      </nav>
      <GoLiveModal open={goLiveOpen} onClose={()=>setGoLiveOpen(false)} onStreamCreated={setLastStream} />
      {lastStream && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-zinc-900 p-6 rounded-2xl max-w-md w-full text-white space-y-4">
            <h2 className="text-lg font-bold">Stream Created!</h2>
            <div>
              <div className="text-xs text-zinc-400 mb-1">RTMP Ingest URL</div>
              <div className="bg-zinc-800 p-2 rounded break-all text-xs">{lastStream.rtmp?.ingest || lastStream.rtmpIngestUrl}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1">Stream Key</div>
              <div className="bg-zinc-800 p-2 rounded break-all text-xs">{lastStream.streamKey || lastStream.streamKey}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1">Playback ID</div>
              <div className="bg-zinc-800 p-2 rounded break-all text-xs">{lastStream.playbackId}</div>
            </div>
            <button className="w-full rounded-xl bg-brand py-3 font-semibold hover:bg-brand-dark" onClick={()=>setLastStream(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
