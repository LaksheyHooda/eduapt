"use client";

import Image from "next/image";
import { db } from "@/config/config";
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
    <div class="bg-bggreen">
      <NavBar></NavBar>
      <div class="flex justify-center items-center h-screen">
        <div class="text-center">
          <h1 class="text-6xl text-greentxtclr font-bold py-5 mt-20">EDUAPT</h1>
          <h2 class="text-3xl text-gray-600 font-semibold mb-4 py-6">
            Teaching simplified, Learning tailored
          </h2>
          <div class="flex justify-center">
            <a
              href="/signup"
              class="bg-blue-500 text-white px-8 py-3 rounded-full mr-4"
            >
              Create Account
            </a>
          </div>
          <div class="flex justify-center">
            <p href="#" class="bg-transparent text-black py-3">
              Already have an account?
            </p>
            <a href="/login" class="bg-transparent text-blue-500 px-2 py-3">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
