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
  const currentWeight = 100 - finalExamWeight;
  // const finalScore =
  //   (targetScore * (currentAverage + finalExamWeight) - currentAverage * currentWeight) /
  //   finalExamWeight;

  // ((currentWeight + finalExamWeight) * targetScore - currentWeight * currentAverage) /
  // finalExamWeight;
  // (100 * targetScore - currentWeight * currentAverage) / finalExamWeight;
  // finalScore = ((target-((100-finalExamWeight) / 100 * currentAverage)) / finalExamWeight) * 100;
  // math.floor(finalScore * 100) / 100
  const finalScore = (targetScore - currentWeight * currentAverage) / finalExamWeight;
  Math.floor((finalScore * 100) / 100);
  return finalScore;
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
