'use client'

import Image from "next/image";
import { db } from '@/config/config';
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";


export default function Home() {
  useEffect(() => {}, []);

  return (
    <div>
      <h1 className="text-white text-xl"> About us </h1>
      <h2> We are EDUAPT, a website designed to bring the power of AI and adaptive learning to the masses </h2>
    </div>
  );
}
