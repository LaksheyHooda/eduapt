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
import OpenAI from "openai";
import { classModulesPrompts, moduleAssignmentPropms } from "./gptprompts.js";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const generateClassContent = async (body) => {
  // Use gpt4o to generate class content
  // Create a bunch of modules based off generated content and proceed to generate assignments for each module
  classModulesPrompts.push({ role: "user", content: body.classDescription });
  const completion = await openai.chat.completions.create({
    messages: classModulesPrompts,
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });
  await createAssignmentsForModule(
    JSON.parse(completion.choices[0].message.content),
    body
  );
};

const createAssignmentsForModule = async (modules, body) => {
  let promises = modules.courseModules.map((module) => {
    let modulePrompts = [...moduleAssignmentPropms]; // Copy the base prompts
    modulePrompts.push({
      role: "user",
      content: `The module name is: ${module.name}. And the module description is: ${module.classDescription}`,
    });
    return openai.chat.completions
      .create({
        messages: modulePrompts,
        model: "gpt-4o",
        response_format: { type: "json_object" },
      })
      .then((completion) => ({
        moduleName: module.name,
        questions: JSON.parse(completion.choices[0].message.content),
      }));
  });

  const questions = await Promise.all(promises);
  const assignmentRefs = await createAssignmentsInFirestore(questions);
  await createClassInFirestore(modules, assignmentRefs, body);
};

const createAssignmentsInFirestore = async (assignments) => {
  let assignmentRefs = {};
  let allPromises = [];

  for (const assignment of assignments) {
    let assignmentRefs = {};
    let allPromises = [];

    if (!Array.isArray(assignment.questions.questions)) {
      console.error(
        `Expected 'questions' to be an array, but got:`,
        assignment.questions.questions
      );
      continue; // Skip to the next iteration if it's not an array
    }

    for (const assignment of assignments) {
      if (!assignmentRefs[assignment.moduleName]) {
        assignmentRefs[assignment.moduleName] = [];
      }
      for (const question of assignment.questions.questions) {
        // Assuming assignment.questions is an array of question objects
        const promise = addDoc(collection(db, "questions"), {
          name: assignment.moduleName, // Assuming moduleName is correctly defined in the assignment object
          question: question.question,
          answer: question.answer,
          reading: question.reading,
        }).then((docRef) => {
          assignmentRefs[assignment.moduleName].push(docRef.id);
          return docRef;
        });

        allPromises.push(promise);
      }
    }

    await Promise.all(allPromises);
    console.log(
      "All assignments have been added to Firestore with their document references grouped by module:"
    );
    return assignmentRefs;
  }

  // Wait for all document creation promises to complete
  await Promise.all(allPromises);
  console.log(
    "All assignments have been added to Firestore with their document references grouped by module:"
  );
  return assignmentRefs; // Return the structured dictionary of assignment refs
};

const createClassInFirestore = async (modules, assignmentRefs, body) => {
  let finalModules = {};

  for (const [key, value] of Object.entries(assignmentRefs)) {
    let module = modules.courseModules.find((module) => module.name === key);
    finalModules[key] = {
      description: module.description,
      name: module.name,
      questions: value,
      studentsAssigned: body.students,
    };
  }

  const classRef = await addDoc(collection(db, "classes"), {
    description: body.classDescription,
    instructorName: body.instructorName,
    modules: finalModules,
    name: body.name,
    primaryInstructor: body.primaryInstructor,
    students: body.students,
    studentsEnrolled: body.students.length,
  });

  await assignClassToStudents(
    classRef.id,
    Object.values(finalModules),
    body.students
  );
};

const assignClassToStudents = async (classId, modules, students) => {
  for (const student of students) {
    const q = query(collection(db, "users"), where("uuid", "==", student));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("User does not exist");
      continue;
    }

    const docSnap = querySnapshot.docs[0];

    if (!docSnap.exists()) {
      console.error("User does not exist");
      continue;
    }

    console.log(modules);
    const assignments = modules.map((module) => ({
      moduleName: module.name,
      moduleDescription: module.description,
      questions: module.questions.map((question) => ({
        questionid: question,
        progress: "TODO",
        content: "",
      })),
    }));
    console.log(assignments);

    await updateDoc(docSnap.ref, {
      classes: arrayUnion(classId),
      assignments: arrayUnion({ classId: assignments }),
    });
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req) {
  const body = await req.json();
  await generateClassContent(body);
  return NextResponse.json({ status: 200 });
  //   try {
  //     let generateedClassConent = await generateClassContent(body);

  //   } catch (error) {
  //     console.error("Error handling request", error);
  //     return NextResponse.error();
  //   }
}
