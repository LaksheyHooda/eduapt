'use client'

import Image from "next/image";
import { db } from '@/config/config';
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import NavBar from "@/components/landingpage-navbar";


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
    <section>
      <NavBar />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-white text-xl"> EDUAPT </h1>
        <h2> An Adaptive Learning and Grading Site </h2>
      </div>
    </section>
  );
}
