"use client";

import Image from "next/image";
import { db, auth } from "@/config/config";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/router";
import Snackbar from "@/components/snackbar";

export default function Dashboard() {
  const [classes, setClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classIndex, setClassIndex] = useState(0);
  const [createClassModal, setCreateClassModal] = useState(false);
  const [studentIds, setStudentIds] = useState([]);
  const [newId, setNewId] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [startedUploadSuccessfully, setStartedUploadSuccessfully] = useState();

  const openCreateClassModal = () => {
    setCreateClassModal(true);
  };

  const closeCreateClassModal = () => {
    setCreateClassModal(false);
  };

  const openModal = (index) => {
    setClassIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addStudentId = (id) => {
    if (!studentIds.includes(id)) {
      // Avoid duplicate IDs
      setStudentIds([...studentIds, id]);
    }
  };

  const removeStudentId = (id) => {
    setStudentIds(studentIds.filter((studentId) => studentId !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStudentIds([]); // Clear the student IDs after submission
    if (
      newClassName === "" ||
      studentIds.length === 0 ||
      newClassDescription === ""
    ) {
      setSnackbarMessage("Please fill out all fields");
      setSnackbarOpen(true);
      return;
    }
    setStartedUploadSuccessfully(true);
    setSnackbarMessage(
      "Class is being created. This will take a few moments. Do not close browser. Please wait..."
    );
    setSnackbarOpen(true);
    closeCreateClassModal(); // Close the modal after submission

    const response = await fetch("/api/createNewClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newClassName,
        classDescription: newClassDescription,
        students: studentIds,
        instructorName: currentUserData.name,
        primaryInstructor: currentUserData.uuid,
      }),
    });

    console.log(response);

    if (response.status === 200) {
      setSnackbarMessage(`Created Class: ${newClassName} successfully`);
    } else {
      setSnackbarMessage("An error occurred. Please try again.");
      setStartedUploadSuccessfully(false);
    }
    // const classData = {
    //   name: newClassName,
    //   description: newClassDescription ,
    //   students: studentIds,
    //   // other relevant class data
    // };
    // // Now post this data to your backend or Firebase
    // console.log(classData); // For demonstration
  };

  const handleAddId = () => {
    if (newId === "") {
      return;
    }
    addStudentId(newId);
    setNewId(""); // Clear the input after adding the ID
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
            if (data.userType !== "Teacher") {
              redirect("/");
            }
            setNotifications(data.notifications);
            setCurrentUserData(data);
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
      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        good={startedUploadSuccessfully}
      />
      <div className="flex flex-row">
        <h1 className="text-greentxtclr font-bold text-2xl">
          Teacher Dashboard
        </h1>
        <Button
          className="text-greentxtclr font-bold rounded-lg text-xl fixed right-10 duration-200 ease-in-out hover:scale-105"
          onClick={openCreateClassModal}
        >
          Create Class
          <FontAwesomeIcon icon={faPlus} className="ml-2" />
        </Button>
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
                  Students Enrolled {cls.studentsEnrolled}
                </h2>
              </div>
              <div className="w-px bg-gray-300 h-full"></div>
              <div className="flex w-[10vw] justify-center items-center relative hover-jiggle">
                <FontAwesomeIcon
                  className="text-greentxtclr"
                  icon={faBell}
                  size="2xl"
                />
                {notifications.findIndex(
                  (item) =>
                    item.classID === "UOGiKcYvyv6nmcDuQB17" &&
                    item.notification === true
                ) !== -1 && (
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
                <div className="mt-4">
                  <p>
                    Students Enrolled: {classes[classIndex].studentsEnrolled}
                  </p>
                  {/* Include additional class details here */}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {createClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="w-3/4 h-3/4 bg-white p-6 overflow-auto transition-transform duration-300 transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-bold">Create Class</h2>
              <button onClick={closeCreateClassModal}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-xl cursor-pointer"
                />
              </button>
            </div>
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Class Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter class name"
                  onChange={(e) => setNewClassName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student IDs
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Student ID"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleAddId()}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  Add ID
                </button>
              </div>
              <ul className="list-disc pl-5">
                {studentIds.map((id) => (
                  <li
                    key={id}
                    className="flex justify-between items-center mt-1"
                  >
                    {id}
                    <button
                      type="button"
                      onClick={() => removeStudentId(id)}
                      className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description - Copy and Paste a Syllabus or write a description
                  (This will be used to generate assignments and lectures)
                </label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md resize-none shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe the class"
                  rows={10}
                  onChange={(e) => setNewClassDescription(e.target.value)}
                ></textarea>
              </div>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
