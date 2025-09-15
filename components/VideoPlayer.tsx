
'use client';
import { Root as Player } from '@livepeer/react/player';

export default function VideoPlayer({ playbackId, posterUrl }: { playbackId?: string; posterUrl?: string }) {
  // Use env or prop for playbackId
  const id = playbackId || process.env.NEXT_PUBLIC_LIVEPEER_EMBED_URL || process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID;
  if (!id) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-black/60 text-white">No livestream configured</div>
    );
  }
  return (
    <div className="h-full w-full overflow-hidden rounded-none">
      <Player
        playbackId={id}
  src={id ? [{ src: `https://lp-playback.com/hls/${id}/index.m3u8`, type: 'hls', mime: 'application/vnd.apple.mpegurl', width: 720, height: 1280 }] : null}
        autoPlay
        aspectRatio={9/16}
      />
    </div>
  );
}
