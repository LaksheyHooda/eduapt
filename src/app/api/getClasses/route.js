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


const getUserType = async (body) => {
    console.log(body.uuid)
    const q = query(collection(db, "users"), where("uuid", "==", body.uuid));
    try {
        const querySnapshot = await getDocs(q);
        const docSnap = querySnapshot.docs[0];
        
        if(!docSnap.exists()) {
            throw new Error("User does not exist");
        } else if(!docSnap.data().userType) {
            throw new Error("User type not found");
        }
        
        return docSnap.data().userType;
    } catch (e) {
        console.error(e);
        return null;
    }    
}

export async function POST(req) {
    const body = await req.json();
    console.log(body);
    try {
        let data = await getUserType(body);
        if(data) {
            return NextResponse.json(data);
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        console.error("Error handling request", error);
        return NextResponse.error();
    }
  }