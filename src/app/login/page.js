'use client'

import Image from "next/image";
import { db } from '@/config/config';
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";


export default function Home() {
  useEffect(() => {
    // Testing firebase working
    // const addDocTest = async () => {
    //   await setDoc(doc(db, "cities", "LA"), {
    //     name: "Los Angeles",
    //     state: "CA",
    //     country: "USA"
    //   });
    // }

    // addDocTest();
  }, []);

  return (
    <div>
      <h1 className="text-white text-xl"> Login </h1>
    </div>
  );
}
