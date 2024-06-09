"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/config/config"; // Adjust the import path to your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events"); // Adjust the collection name if necessary
        const eventSnapshot = await getDocs(eventsCollection);
        const eventList = eventSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          start: new Date(doc.data().start.seconds * 1000),
          end: new Date(doc.data().end.seconds * 1000),
          allDay: doc.data().allDay,
        }));
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="flex justify-center inset-0 fixed items-center h-screen bg-gradient-to-r from-[#006e96] to-[#243c5a]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl">
        <h2 className="font-sans text-center text-4xl font-black text-slate-900 mb-4">
          Calendar
        </h2>
        <div className="container mx-auto p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </main>
  );
}
