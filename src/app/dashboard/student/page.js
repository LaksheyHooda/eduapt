'use client'

import Image from "next/image";
import { db } from '@/config/config';
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";


export default function Home() {
  useEffect(() => {
  }, []);

  return (
    <div>
      <h1 className="text-white text-xl"> Student Dashboard </h1>
    </div>
  );
}
