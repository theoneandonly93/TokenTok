"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="flex flex-col items-center"
      >
        <Image
          src="/TokenTok.png"
          alt="TokenTok Logo"
          width={160}
          height={160}
          className="rounded-2xl shadow-lg w-32 h-32 sm:w-40 sm:h-40 max-w-[80vw] max-h-[40vh] object-contain"
          priority
        />
        <motion.h1
          className="mt-6 text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg text-center max-w-xs sm:max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          TokenTok
        </motion.h1>
        <motion.p
          className="mt-2 text-base sm:text-lg text-zinc-300 tracking-wide text-center max-w-xs sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          The Web3 Livestream Launchpad
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
