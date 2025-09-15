import { useState } from 'react';
import Modal from './Modal';
import { toast } from 'react-hot-toast';
import { Jupiter, RouteInfo } from '@jup-ag/core';
import { useWallet } from '@solana/wallet-adapter-react';

interface QuickBuyModalProps {
  open: boolean;
  onClose: () => void;
  tokenMint: string;
  ticker: string;
}

export default function QuickBuyModal({ open, onClose, tokenMint, ticker }: QuickBuyModalProps) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('SOL');
  const [estimating, setEstimating] = useState(false);
  const [estimatedTokens, setEstimatedTokens] = useState<string | null>(null);
  const [buying, setBuying] = useState(false);
  const wallet = useWallet();

  // Placeholder: Replace with Jupiter SDK logic
  const estimateTokens = async () => {
    setEstimating(true);
    setTimeout(() => {
      setEstimatedTokens((parseFloat(amount) * 100).toFixed(2));
      setEstimating(false);
    }, 800);
  };

  const handleBuy = async () => {
    setBuying(true);
    // Placeholder: Replace with Jupiter swap logic
    setTimeout(() => {
      toast.success('Swap successful!');
      setBuying(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Quick Buy {ticker}</h3>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="flex-1 rounded bg-zinc-800 p-2 text-white outline-none"
            placeholder="Amount"
          />
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value as 'SOL' | 'USDC')}
            className="rounded bg-zinc-800 p-2 text-white outline-none"
          >
            <option value="SOL">SOL</option>
            <option value="USDC">USDC</option>
          </select>
        </div>
        <button
          className="w-full rounded bg-brand py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
          disabled={!amount || estimating}
          onClick={estimateTokens}
        >
          {estimating ? 'Estimating...' : 'Estimate Tokens'}
        </button>
        {estimatedTokens && (
          <div className="text-sm text-zinc-300">
            ≈ {estimatedTokens} {ticker}
          </div>
        )}
        <button
          className="w-full rounded bg-green-600 py-2 font-semibold hover:bg-green-700 disabled:opacity-50"
          disabled={!estimatedTokens || buying}
          onClick={handleBuy}
        >
          {buying ? 'Buying...' : 'Buy Now'}
        </button>
      </div>
    </Modal>
  );
}
