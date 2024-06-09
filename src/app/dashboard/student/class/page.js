"use client";

import Image from "next/image";
import { db, auth } from "@/config/config";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default function StudentClass() {
  const [assignments, setAssignments] = useState([
    {
      moduleName: "1",
      assignmentName: "Assignment 1",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 1",
      date: "June 17, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "1",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "3",
      assignmentName: "Assignment 5",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
    {
      moduleName: "2",
      assignmentName: "Assignment 2",
      date: "June 15, 2024",
      grade: "A",
      status: "Completed",
    },
  ]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortBy = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedAssignments = [...assignments].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setAssignments(sortedAssignments);
  };

  useEffect(() => {
    //   auth.onAuthStateChanged((user) => {
    //     if (!user) {
    //       redirect("/login");
    //     } else {
    //       fetch("/api/getUserType", {
    //         method: "POST",
    //         body: JSON.stringify({
    //           uuid: user.uid,
    //         }),
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           console.log(data);
    //           if (data.userType !== "Student") {
    //             redirect("/");
    //           }
    //         });
    //       fetch("/api/getClasses", {
    //         method: "POST",
    //         body: JSON.stringify({
    //           uuid: user.uid,
    //         }),
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           setClasses(data);
    //           console.log(data);
    //         });
    //     }
    //   });
  }, []);
  return (
    <div className="flex bg-bggreen items-center w-screen flex-col h-screen p-10 overflow-x-hidden">
      <div className="flex flex-row">
        <h1 className="text-3xl text-black font-semibold py-10">Course 1</h1>
      </div>
      <div class="container mx-auto px-4 py-8">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="">
              <tr class="text-black">
                <th class="px-4 py-2">
                  Module Name
                  <Button class="ml-1" onClick={() => sortBy("moduleName")}>
                    <FontAwesomeIcon icon={faSort} />
                  </Button>
                </th>
                <th class="px-4 py-2">
                  Assignment Name
                  <Button class="ml-1" onClick={() => sortBy("assignmentName")}>
                    <FontAwesomeIcon icon={faSort} />
                  </Button>
                </th>
                <th class="px-4 py-2">
                  Due Date
                  <Button class="ml-1" onClick={() => sortBy("date")}>
                    <FontAwesomeIcon icon={faSort} />
                  </Button>
                </th>
                <th class="px-4 py-2">
                  Grade
                  <Button class="ml-1" onClick={() => sortBy("date")}>
                    <FontAwesomeIcon icon={faSort} />
                  </Button>
                </th>
                <th class="px-4 py-2">
                  Status
                  <Button class="ml-1" onClick={() => sortBy("status")}>
                    <FontAwesomeIcon icon={faSort} />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody
              id="assignmentBody"
              className="bg-stone-300 overflow-y-scroll text-black border"
            >
              {assignments.map((assignment, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{assignment.moduleName}</td>
                  <td className="px-4 py-2">{assignment.assignmentName}</td>
                  <td className="px-4 py-2">{assignment.date}</td>
                  <td className="px-4 py-2">{assignment.grade}</td>
                  <td className="px-4 py-2">{assignment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
