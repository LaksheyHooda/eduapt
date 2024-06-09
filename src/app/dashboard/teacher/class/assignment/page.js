import { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseConfig"; // Adjust import path
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import ChatBox from "@/components/ChatBox";

const StudentViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchAssignment = async () => {
        const docRef = doc(db, "assignments", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAssignment(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };
      fetchAssignment();
    }
  }, [id]);

  if (!assignment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>
      <p className="mb-4">{assignment.description}</p>
      <p className="mb-8">Due Date: {assignment.dueDate}</p>
      <ChatBox />
    </div>
  );
};

export default StudentViewPage;
