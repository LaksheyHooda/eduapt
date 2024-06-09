"use client";

import { auth } from "@/config/config";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const fetchUserType = async (uid) => {
    const response = await fetch("/api/getUserType", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: uid,
      }),
    }).then((res) => res.json());

    if (response.userType === "Student") {
      router.push("/dashboard/student");
    } else if (response.userType === "Teacher") {
      router.push("/dashboard/teacher");
    } else {
      // router.push("/login");
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        // Check if student or teacher
        if (user.uid) {
          fetchUserType(user.uid);
        }
      }
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-white text-xl"> laoding... </h1>
    </div>
  );
}
