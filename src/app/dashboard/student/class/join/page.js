import { useState } from "react";
import { db } from "@/config/config"; // Adjust import path
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";

const JoinClassPage = () => {
  const [classCode, setClassCode] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleJoinClass = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!classCode || !studentEmail) {
      setError("All fields are required");
      return;
    }
    try {
      const classDoc = doc(db, "classes", classCode);
      const docSnap = await getDoc(classDoc);
      if (docSnap.exists()) {
        await updateDoc(classDoc, {
          students: arrayUnion(studentEmail),
        });
        setClassCode("");
        setStudentEmail("");
        setSuccess("Joined class successfully!");
      } else {
        setError("Invalid class code");
      }
    } catch (err) {
      setError("Failed to join class");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Join Class</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form
        onSubmit={handleJoinClass}
        className="bg-white shadow-md rounded p-4"
      >
        <div className="mb-4">
          <label className="block mb-2 font-bold">Class Code</label>
          <input
            type="text"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Your Email</label>
          <input
            type="email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinClassPage;
