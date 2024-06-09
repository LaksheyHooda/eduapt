'use client'

import Image from "next/image";
import { db, auth } from '@/config/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {Button} from "@nextui-org/react"
import { doc, setDoc } from "firebase/firestore";
import Snackbar from "@/components/snackbar";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  
  const router = useRouter();

  useEffect(() => { 
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    console.log("Signing up");
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorMessage)
      setError(true)
    });
  }

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  } 

  return ( 
    <div onSubmit={handleSubmit}>
      <Snackbar message={errorMessage} open={error} />

      <h1 className="text-white text-xl"> SignUp </h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" onChange={onEmailChanged} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={onPasswordChanged} />
        </label>
        <Button onClick={handleSubmit}>Sign Up</Button>
      </form>
    </div>
  );
}
