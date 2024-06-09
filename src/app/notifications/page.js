"use client";

import { useEffect, useState } from "react";
import { db } from "@/config/config"; // Adjust import path
import { collection, getDocs, query, where } from "firebase/firestore";

const NotificationsPage = ({ userEmail }) => {
  const [notifications, setNotifications] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      const classQuerySnapshot = await getDocs(collection(db, "classes"));
      const classesData = classQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classesData);
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      let notificationQuery;
      if (selectedClass) {
        notificationQuery = query(
          collection(db, "notifications"),
          where("classId", "==", selectedClass)
        );
      } else {
        notificationQuery = collection(db, "notifications");
      }
      const notificationQuerySnapshot = await getDocs(notificationQuery);
      const notificationsData = notificationQuerySnapshot.docs.map((doc) =>
        doc.data()
      );
      setNotifications(notificationsData);
    };
    fetchNotifications();
  }, [selectedClass]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Filter by Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Classes</option>
          {classes.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.name}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        {notifications.map((notification, index) => (
          <div key={index} className="p-4 border-b last:border-b-0">
            <p>{notification.message}</p>
            <span className="text-gray-500 text-sm">
              {new Date(notification.date).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
