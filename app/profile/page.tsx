'use client';

import { useState, useRef } from 'react';
import Shell from '@/components/Shell';

export default function ProfilePage() {
  const [name, setName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('profileName') || '';
    }
    return '';
  });
  const [photo, setPhoto] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('profilePhoto') || '';
    }
    return '';
  });
  const [preview, setPreview] = useState<string>(photo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('profileName', name);
    if (preview) {
      localStorage.setItem('profilePhoto', preview);
      setPhoto(preview);
    }
    alert('Profile updated!');
  };

  return (
    <Shell>
      <div className="h-dvh overflow-y-auto p-4 pt-16">
        <h1 className="mb-2 text-xl font-semibold">Your profile</h1>
        <div className="rounded-2xl bg-white/5 p-4 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-24 h-24">
              <img
                src={preview || '/logo.svg'}
                alt="Profile"
                className="rounded-full object-cover w-24 h-24 border border-white/20"
              />
              <button
                className="absolute bottom-0 right-0 bg-black/60 text-white rounded-full p-1 text-xs border border-white/20"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change photo"
              >
                Change
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Your name"
              className="mt-2 px-3 py-2 rounded bg-black/30 text-white w-48 text-center border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              maxLength={32}
            />
            <button
              onClick={handleSave}
              className="mt-3 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Save Changes
            </button>
          </div>
          <hr className="my-4 border-white/10" />
          <p className="text-sm text-white/80">Past commits, claims, and streams will appear here.</p>
        </div>
      </div>
    </Shell>
  );
}
