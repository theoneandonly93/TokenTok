'use client';
import { useState } from 'react';
import Modal from './Modal';

export default function CommitModal({
  open, onClose, onCommit
}:{
  open: boolean;
  onClose: () => void;
  onCommit: (amount: number, currency: 'SOL'|'USDC') => Promise<void>;
}){
  const [amount, setAmount] = useState('0.5');
  const [currency, setCurrency] = useState<'SOL'|'USDC'>('SOL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true); setError(null);
    try { await onCommit(parseFloat(amount), currency); onClose(); }
    catch (e:any){ setError(e?.message || 'Commit failed'); }
    finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Commit to this launch</h3>
        <div className="flex gap-2">
          <input
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            className="w-full rounded-xl bg-zinc-800 p-3 outline-none"
            inputMode="decimal"
            placeholder="Amount"
          />
          <select
            value={currency}
            onChange={(e)=>setCurrency(e.target.value as any)}
            className="rounded-xl bg-zinc-800 p-3"
          >
            <option value="SOL">SOL</option>
            <option value="USDC">USDC</option>
          </select>
        </div>
        {error && <div className="text-sm text-red-400">{error}</div>}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full rounded-xl bg-brand py-3 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {loading ? 'Processing…' : 'Commit'}
        </button>
        <p className="text-xs text-zinc-400">
          This sends a pledge to the launch program. In this starter it is a stub; wire to your Anchor method later.
        </p>
      </div>
    </Modal>
  );
}
