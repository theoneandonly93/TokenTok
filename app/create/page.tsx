'use client';
import Shell from '@/components/Shell';
import { useState } from 'react';

export default function CreatePage(){
  const [form, setForm] = useState({ title:'', ticker:'', goal:'1000'});

  return (
    <Shell>
      <div className="h-dvh overflow-y-auto p-4 pt-16">
        <h1 className="mb-4 text-xl font-semibold">Start a live launch</h1>
        <div className="space-y-3">
          <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" className="w-full rounded-xl bg-white/10 p-3 outline-none" />
          <input value={form.ticker} onChange={e=>setForm({...form, ticker:e.target.value})} placeholder="Ticker (e.g. GHOST)" className="w-full rounded-xl bg-white/10 p-3 outline-none" />
          <input value={form.goal} onChange={e=>setForm({...form, goal:e.target.value})} placeholder="Goal in SOL" className="w-full rounded-xl bg-white/10 p-3 outline-none" />
          <button className="w-full rounded-xl bg-brand py-3 font-semibold hover:bg-brand-dark">Go Live (stub)</button>
          <p className="text-xs text-zinc-400">Wire this to your streaming provider (Mux/Livepeer) & Anchor createLaunch method.</p>
        </div>
      </div>
    </Shell>
  );
}
