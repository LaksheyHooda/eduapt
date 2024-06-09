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

const generateClassContent = async (body) => {
  // Use gpt4o to generate class content
  // Create a bunch of modules based off generated content and proceed to generate assignments for each module
};

const createAssignmentsForModule = async (moduleDescription) => {};

const createClassInFirestore = async (classContent) => {
  // Add class to firestore
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req) {
  const body = await req.json();
  await sleep(10000);
  return NextResponse.json({ status: 200 });
  //   try {
  //     let generateedClassConent = await generateClassContent(body);

  //   } catch (error) {
  //     console.error("Error handling request", error);
  //     return NextResponse.error();
  //   }
}
