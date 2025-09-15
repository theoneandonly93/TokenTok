'use client';

import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Shell from '@/components/Shell';
import Feed from '@/components/Feed';

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
        <Shell>
          <Feed />
        </Shell>
      )}
    </>
  );
}
