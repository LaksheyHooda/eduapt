'use client'

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import FailedLoginModal from "@/components/failedloginmodal";
import { auth } from '@/config/config';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword  } from "firebase/auth";
import Snackbar from "@/components/snackbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, []);

  const handleSignup = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
        }
      );
    } catch (error) {
      setError(true);
      setIsModalOpen(true);

      if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email address.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("User not found.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignup();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex justify-center inset-0 fixed items-center h-screen bg-gradient-to-r from-[#243c5a] to-[#056954]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Welcome to EduApt!
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            className="mt-4 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text caret-blue-500 animate-blink-wide text-black"
            placeholder="Email"
            onKeyDown={handleKeyDown}
            value={email}
            onChange={onEmailChanged}
            required
          />
          <Input
            className="mt-4 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text caret-blue-500 animate-blink-wide text-black"
            placeholder="Password"
            type="password"
            onKeyDown={handleKeyDown}
            value={password}
            onChange={onPasswordChanged}
            required
          />
          <div className="flex justify-between items-center mb-4">
            <div>
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="mr-2"
              />
              <label htmlFor="remember" className="font-medium text-slate-900">
                Remember me
              </label>
            </div>
            <Link
              href="/forgotPassword"
              className="text-blue-500 hover:text-blue-700 font-medium">
              Forgot password?
            </Link>
          </div>
          <Button
            onClick={handleSubmit}
            className="py-2 px-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 shadow-gray-500/50 font-bold">
            Login
          </Button>
        </form>

        <FailedLoginModal
          isOpen={isModalOpen}
          message={errorMessage}
          onClose={() => setIsModalOpen(false)}
        />

        <div className="mt-4 text-center">
          <span className="mr-2 text-slate-900">Don't have an account?</span>
          <Link
            href="/signup"
            className="text-blue-500 hover:text-blue-700 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
