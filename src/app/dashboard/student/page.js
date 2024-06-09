"use client";

import Image from "next/image";
import { db, auth } from "@/config/config";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Home() {
  const [classes, setClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classIndex, setClassIndex] = useState(0);
  const [newClassModal, setNewClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const router = useRouter();

  const openNewClassModal = () => {
    setNewClassModal(true);
  };

  const closeNewClassModal = () => {
    setNewClassModal(false);
  };

  const openModal = (index) => {
    setClassIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addClass = () => {
    console.log("Add class:", newClassName);
    // Here you can integrate the logic to add the class to your database
    // Add the class to user
    setNewClassName("");
    closeNewClassModal();
  };

  const gotoClass = () => {
    console.log(classes[classIndex]);
    router.push("student/class?classId=" + classes[classIndex].classId);
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
        <Button
          Button
          onClick={openNewClassModal}
          className="text-greentxtclr font-bold rounded-lg text-xl fixed right-10 duration-200 ease-in-out hover:scale-105"
        >
          Add Class
          <FontAwesomeIcon icon={faPlus} className="ml-2" />
        </Button>

        {newClassModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <button
                onClick={closeNewClassModal}
                className="absolute top-2 right-2"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-4">Add New Class</h2>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Class Name"
                  className="border p-2 rounded-lg mb-4"
                />
                <Button onClick={addClass} auto>
                  Add Class
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-[40vw] overflow-y-auto">
          {classes.map((cls, index) => (
            <div
              key={index}
              className="flex flex-row justify-between w-[35vw] ml-10 bg-white p-4 rounded-lg shadow-xl my-2 transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <div className="flex flex-col">
                <h1 className="text-greentxtclr font-bold text-xl w-[20vw]">
                  {cls.name}
                </h1>
                <h2 className="text-greentxtclr font-bold text-lg">
                  Instructor: {cls.instructorName}
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
        <div className="flex flex-col justify-between w-[50vw] min-h-[85vh]">
          {isModalOpen ? (
            <div
              className="fixed inset-0 flex justify-end items-start bg-black bg-opacity-50"
              onClick={closeModal}
            >
              <div
                className="w-1/2 min-h-screen bg-white p-6 overflow-auto transition-transform duration-300 transform"
                style={{
                  transform: isModalOpen
                    ? "translateX(0%)"
                    : "translateX(100%)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="text-xl font-bold">
                    {classes[classIndex].name}
                  </h2>
                  <button onClick={closeModal}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-xl cursor-pointer"
                    />
                  </button>
                </div>
                <div className="mt-4 text-left overflow-y-auto w-[46vw] pb-20 fixed overflow-x-hidden">
                  <h3 className="mt-2 text-lg font-bold">Class Details:</h3>
                  <p>Instructor Name: {classes[classIndex].instructorName}</p>
                  <p>
                    Students Enrolled: {classes[classIndex].studentsEnrolled}
                  </p>
                  <p>
                    Number of Assignments:{" "}
                    {Object.keys(classes[classIndex].modules).length}
                  </p>
                  <div>
                    <h3 className="mt-10 text-lg font-bold">Module Names:</h3>
                    <ul>
                      {Object.keys(classes[classIndex].modules).map(
                        (key, index) => (
                          <li key={index}>{key}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="flex w-full justify-center items-center h-full">
                    <Button
                      className="bg-greentxtclr text-white rounded-md mt-20"
                      onClick={gotoClass}
                    >
                      Go to Class
                    </Button>
                  </div>
                  {/* Include additional class details here */}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
