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


const setUserInfo = async (body) => {
    if(!body) { return null; }
        if (body.uuid == null || body.userType == "" || body.name == "" || body.email == "") {
            return false;
        } else {
            try {
            await addDoc(collection(db, "users"), {
                name: body.name,
                email: body.email,
                uuid: body.uuid,
                userType: body.userType,
                classes: [],
                questions: []
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export async function POST(req) {
    const body = await req.json();
    console.log(body);
    try {
        let success = await setUserInfo(body);
        if(success) {
            return NextResponse.success();
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        console.error("Error handling request", error);
        return NextResponse.error();
    }
  }