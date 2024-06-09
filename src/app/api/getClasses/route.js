import { NextResponse } from "next/server";
import { db } from "@/config/config";
import {
  addDoc,
  setDoc,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

const getClassInfoTeacher = async (body) => {
  const q = query(
    collection(db, "classes"),
    where("primaryInstructor", "==", body.uuid)
  );
  try {
    const querySnapshot = await getDocs(q);
    let classes = [];
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      docData["classId"] = doc.id;
      classes.push(docData);
    });
    return classes;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getUserInfo = async (body) => {
  console.log(body.uuid);
  const q = query(collection(db, "users"), where("uuid", "==", body.uuid));
  try {
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];

    if (!docSnap.exists()) {
      throw new Error("User does not exist");
    } else if (!docSnap.data().userType) {
      throw new Error("User type not found");
    }

    return docSnap.data();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export async function POST(req) {
  const body = await req.json();
  try {
    let data = await getUserInfo(body);
    if (data) {
      if (data.userType === "Teacher") {
        let info = await getClassInfoTeacher(body);
        return NextResponse.json(info);
      } else {
        //get student info
      }
      let info = await getClassInfo(body);
      return NextResponse.json(info);
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error("Error handling request", error);
    return NextResponse.error();
  }
}
