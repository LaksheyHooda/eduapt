"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { auth } from "@/config/config";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { redirect } from 'next/navigation'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    auth.signOut();
    redirect('/')
    };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen absolute z-10">
      <Button
        className="bg-transparent fill-current text-black hover:text-red-500 rounded-md transition-colors"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          " "
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12H20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 18H20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Button>
      <div
        className={`fixed inset-0 z-40 flex transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          ref={sidebarRef}
          className="bg-white shadow-lg rounded-r-3xl p-6 flex flex-col justify-between relative"
        >
          <div className="absolute top-4 right-4">
            <Button
              onClick={toggleSidebar}
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none w-10 h-10"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </Button>
          </div>
          <div>
            <div className="mt-12   md:border-2 rounded-full p-4">
              <Link href="/" className="md:w-48 md:h-48 max-w-full h-auto">
                <p>Home</p>
              </Link>
            </div>

            <nav className="mt-8">
              <Link
                href="/dashboard"
                className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faTableColumns} />
                <span className="font-medium text-gray-800">Dashboard</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                  <path
                    d="M23 21v-2a4 4 0 0 0-3-3.87"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 3.13a4 4 0 0 1 0 7.75"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-medium text-gray-800">About</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center justify-between">
            <Button
              onClick={logOut}
              className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <span className="font-medium text-gray-800">Logout</span>
            </Button>
            <Link
              href="#"
              className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
