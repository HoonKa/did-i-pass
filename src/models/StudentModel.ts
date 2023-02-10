const students: StudentManager = {};

function getStudentData(): StudentManager {
  return students;
}

function calculateAverages(weights: CourseGrades): number {
  let subtotal = 0;

  for (const grade of weights.assignmentWeights) {
    subtotal += (grade.grade * grade.weight) / (100 - weights.finalExamWeight);
  }

  return subtotal;
}

// addStudent()
function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  // the the name is already in `students`
  if (name in students) {
    // then return false
    return false;
  }

  // Calculate the student's current average (use the function previously defined)
  const currentAverage = calculateAverages(weights);

  // Create a `Student` object using the `name`, `weights` and `currentAverage`
  const newStudent: Student = { name, weights, currentAverage };

  // Add the new Student to the `students` object. The student's name is the key
  students[name] = newStudent;

  // Finally, return true since the student was added
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // If the student's name is not in `students`

  if (!(studentName in students)) {
    // then return undefined
    return undefined;
  }

  // Return the student's information (their name is the key for `students`)
  return students[studentName];
}

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  const remainWeight = 100 - finalExamWeight;
  const result = (targetScore - currentAverage * remainWeight) / finalExamWeight;

  return result;
  // TODO: Calculate the final exam score needed to get the targetScore in the class
}

export {
  students,
  getStudentData,
  addStudent,
  getStudent,
  calculateAverages,
  calculateFinalExamScore,
};
