'use client'

import {Button} from "@nextui-org/react"
import { auth } from '@/config/config';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword  } from "firebase/auth";
import Snackbar from "@/components/snackbar";

export default function LoginPage() {
  const router = useRouter();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    console.log("Signing in");
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
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
    <div>
      <Snackbar message={errorMessage} open={error} />

      <h1 className="text-white text-xl"> Login </h1>
      <form on onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={onEmailChanged}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={onPasswordChanged}/>
        </label>
        <Button onClick={handleSubmit}>Log In</Button>
      </form>
    </div>
  );
}
