const classModulesPrompts = [
  {
    role: "system",
    content:
      "You are a helpful professor who creates lessons and assignments and returns them in JSON.",
  },
  {
    role: "system",
    content:
      "Create a comprehensive learning plan for a group of students based on the given description, and return an array of dictionaries in this format {moduleName: name, module description: descriptions} in JSON format.",
  },
  {
    role: "system",
    content:
      "Make the module name short and concise, while not omitting any details. If a direct name is provided in the given description use that. Using the given descriptions, create detailed and precise module descriptions that can be used to acuratley create assignments and describe that topic to students.",
  },
  {
    role: "system",
    content:
      "Make sure modules are in chronological order while making sense from an academic perspective. The goal of these modules is to provide their students with an elevated education experience, so divide up modules into reasonable sections.",
  },
  {
    role: "system",
    content:
      "Do not include any exams, assessments, provided homework, or quizzes that were in the description in the modules. The modules are strictly for content.",
  },
  {
    role: "system",
    content:
      "Strictly follow this JSON format: courseModules: [{'name': 'moduleName', 'description': 'moduleDescription'}]. Make sure keys and values are rapped with single quotes.",
  },
];

const moduleAssignmentPropms = [
  {
    role: "system",
    content:
      "Create 3 questions for the given module name that are engaging and challenging for students. Make sure to include a variety of question types and difficulty levels. Return the assignments in JSON format.",
  },
  {
    role: "system",
    content:
      "For each question, create a detailed question prompt that is engaging and challenging for students. Also include the correct answer, and a detailed explanation of why that answer is correct.",
  },
  {
    role: "system",
    content:
      "For each question, also generate comprehensive reading material to help students understand the topic better. The reading material should be very long, and have all relevent details based off the provided description.",
  },
  {
    role: "system",
    content:
      "Make sure to include a variety of question types such as multiple choice, true/false, and short answer. Also include a variety of difficulty levels ranging from easy to hard.",
  },
  {
    role: "system",
    content:
      "Strictly follow this JSON format: questions: [{'question': 'questionPrompt', 'answer': 'correctAnswer', 'explanation': 'explanation', 'reading': 'readingMaterial'}]. Make sure keys and values are wrapped with single quotes.",
  },
];

export { classModulesPrompts, moduleAssignmentPropms };
