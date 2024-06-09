"use client";

import Image from "next/image";
import { db, auth } from "@/config/config";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [classes, setClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classIndex, setClassIndex] = useState(0);

  const openModal = (index) => {
    setClassIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        redirect("/login");
      } else {
        fetch("/api/getUserType", {
          method: "POST",
          body: JSON.stringify({
            uuid: user.uid,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.userType !== "Student") {
              redirect("/");
            }
            setNotifications(data.notifications);
          });

        fetch("/api/getClasses", {
          method: "POST",
          body: JSON.stringify({
            uuid: user.uid,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setClasses(data);
            console.log(data);
          });
      }
    });
  }, []);

  return (
    <div className="flex bg-bggreen min-h-screen min-w-screen w-screen flex-col items-center p-10 overflow-x-hidden">
      <style jsx>{`
        @keyframes jiggle {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        .hover-jiggle:hover {
          animation: jiggle 0.5s ease-in-out infinite;
        }
      `}</style>
      <div className="flex flex-row">
        <h1 className="text-greentxtclr font-bold text-2xl">
          Student Dashboard
        </h1>
        <Button className="text-greentxtclr font-bold rounded-lg text-xl fixed right-10 duration-200 ease-in-out hover:scale-105">
          Add Class
          <FontAwesomeIcon icon={faPlus} className="ml-2" />
        </Button>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-[40vw] overflow-y-auto">
          {classes.map((cls) => (
            <div className="flex flex-row justify-between w-[35vw] ml-10 bg-white p-4 rounded-lg shadow-xl my-2 transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
              <div className="flex flex-col">
                <h1 className="text-greentxtclr font-bold text-xl w-[20vw]">
                  {" "}
                  {cls.name}{" "}
                </h1>
                <h2 className="text-greentxtclr font-bold text-lg">
                  Instructor: {cls.instructorName}{" "}
                </h2>
              </div>
              <div className="w-px bg-gray-300 h-full"></div>
              <div className="flex w-[10vw] justify-center items-center relative hover-jiggle">
                <FontAwesomeIcon
                  className="text-greentxtclr"
                  icon={faBell}
                  size="2xl"
                />
                {cls.notifications > 0 && (
                  <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between w-[50vw] min-h-[85vh]"></div>
      </div>
    </div>
  );
}
