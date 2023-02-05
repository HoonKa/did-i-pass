const students: StudentManager = {};

function getStudentData(): StudentManager {
  return students;
}

function calculateAverages(weights: CourseGrades): number {
  let subtotal = 0;
  let size = 0;

  for (const grades of weights.assignmentWeights) {
    subtotal += grades.weight;
    size += 1;
  }

  const average = subtotal / size;
  return average / size;
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
  const Name = students[studentName];

  if (!Name) {
    // then return undefined
    return undefined;
  }

  // Return the student's information (their name is the key for `students`)
  return Name;
}

export { students, getStudentData, addStudent, getStudent };
