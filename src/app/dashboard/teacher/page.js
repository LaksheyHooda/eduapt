'use client'

import Image from "next/image";
import { db } from '@/config/config';
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";


export default function Home() {
  useEffect(() => {
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-white text-xl"> Teacher Dashboard </h1>
    </div>
  );
}
