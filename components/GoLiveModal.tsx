import { useState } from 'react';
import Modal from '@/components/Modal';

export default function GoLiveModal({ open, onClose, onStreamCreated }:{ open:boolean; onClose:()=>void; onStreamCreated:(stream:any)=>void }) {
  const [title, setTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string|null>(null);

  // Call Livepeer Studio API to create a stream
  const createStream = async () => {
    setCreating(true); setError(null);
    try {
      const res = await fetch('https://livepeer.studio/api/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LIVEPEER_API_KEY}`
        },
        body: JSON.stringify({ name: title })
      });
      if (!res.ok) throw new Error('Failed to create stream');
      const stream = await res.json();
      onStreamCreated(stream);
      onClose();
    } catch (e:any) {
      setError(e.message || 'Error creating stream');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Go Live</h3>
        <input
          value={title}
          onChange={e=>setTitle(e.target.value)}
          className="w-full rounded-xl bg-zinc-800 p-3 outline-none"
          placeholder="Stream title"
        />
        {error && <div className="text-sm text-red-400">{error}</div>}
        <button
          onClick={createStream}
          disabled={creating || !title}
          className="w-full rounded-xl bg-brand py-3 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {creating ? 'Creating…' : 'Create Stream'}
        </button>
        <p className="text-xs text-zinc-400">A new Livepeer stream will be created. You will get ingest and playback info here.</p>
      </div>
    </Modal>
  );
}
