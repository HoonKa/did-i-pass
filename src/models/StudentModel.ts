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

// TODO: Calculate the final exam score needed to get the targetScore in the class
function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  const currentWeight = 100 - finalExamWeight;
  const finalScore = (targetScore - currentWeight * currentAverage) / finalExamWeight;
  Math.floor((finalScore * 100) / 100);
  return finalScore;
}

function getLetterGrade(score: number): string {
  let grade: string = '';
  if (score >= 90) {
    grade = 'A';
  } else if (score >= 80) {
    grade = 'B';
  } else if (score >= 70) {
    grade = 'C';
  } else if (score >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }
  return grade;
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  // TODO: Get the student's data from the dataset
  const studentData = getStudent(studentName);
  // TODO: If the student was not found
  if (!studentData) {
    // TODO: return false
    return false;
  }
  // TODO: Search the student's `assignmentWeights` and find the assignment with the matching name using the .find() method
  const assignment = studentData.weights.assignmentWeights.find(
    ({ name }) => name === assignmentName
  );

  // TODO: If the assignment was not found
  if (!assignment) {
    // TODO: return false
    return false;
  }

  // TODO: Set the assignment's grade to the newGrade
  assignment.grade = newGrade;
  // TODO: Then recalculate the student's currentAverage
  studentData.currentAverage = calculateAverages(studentData.weights);
  // TODO: return true since the update completed successfully
  return true;
}

export {
  students,
  getStudentData,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
};
