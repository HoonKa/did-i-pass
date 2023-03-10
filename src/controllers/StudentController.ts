import { Request, Response } from 'express';
import {
  getStudentData,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentModel';

// import { students, addStudent, getStudent } from '../models/StudentsModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(getStudentData());
}

function createNewStudent(req: Request, res: Response): void {
  console.log(`\nPOST /api/Students`);
  console.log(req.body);

  // const studentData = // Assign `req.body` as a `NewStudentRequest`
  const studentData = req.body as NewStudentRequest;
  // const didAddStudent = // Call the `addStudent` function using the student's data
  const didAddStudent = addStudent(studentData);

  // If the student's data was not added successfully
  // Responds with status 409 (This means 409 Conflict)
  // return from the function
  if (didAddStudent === false) {
    res.sendStatus(409); // The customer name already exists in the dataset
    return;
  }

  let subtotal = 0;
  for (const grade of studentData.weights.assignmentWeights) {
    subtotal += grade.weight;
  }
  const total = subtotal + studentData.weights.finalExamWeight;
  // let subtotal = 0;
  // for (const grade of studentData.weights.assignmentWeights) {
  //   subtotal += (grade.grade * grade.weight) / (100 - studentData.weights.finalExamWeight);
  // }

  if (total !== 100) {
    res.sendStatus(400);
    return;
  }
  // Send status 201 (This means 201 Created)
  res.sendStatus(201);

  // Echo the body back to the client
  // res.json(req.body);
}

function getStudentByName(req: Request, res: Response): void {
  console.log(`\nGET /api/students/:studentName`);
  console.log(req.params);
  const { studentName } = req.params as StudentNameParams;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404);
    return;
  }
  // The stuedent did exist
  res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void {
  //   Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;
  //   Get the student's data from the dataset
  const studentData = getStudent(studentName);

  //   If the student was not found
  if (!studentData) {
    //   responds with status 404 Not Found
    res.sendStatus(404);
    //   terminate the function
    return;
  }

  //   Get the current average and weights from the student's data
  const { currentAverage } = studentData;
  const { weights } = studentData;
  const { finalExamWeight } = weights;

  //   Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  const gradeNeededForA = calculateFinalExamScore(currentAverage, finalExamWeight, 90);
  //   Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  const gradeNeededForB = calculateFinalExamScore(currentAverage, finalExamWeight, 80);
  //   Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  const gradeNeededForC = calculateFinalExamScore(currentAverage, finalExamWeight, 70);
  //   Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  const gradeNeededForD = calculateFinalExamScore(currentAverage, finalExamWeight, 60);

  const finalExamScores: FinalExamScores = {
    neededForA: gradeNeededForA,
    neededForB: gradeNeededForB,
    neededForC: gradeNeededForC,
    neededForD: gradeNeededForD,
  };
  //   Send a JSON response with an object containing the grades needed for an A through D
  res.json(finalExamScores);
}

function calcFinalScore(req: Request, res: Response): void {
  //   Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;
  //   Get the student's data from the datase
  const studentData = getStudent(studentName);

  //   If the student was not found
  if (!studentData) {
    //   responds with status 404 Not Found
    res.sendStatus(404);
    //   terminate the function
    return;
  }
  //   Get the grade data from the request body as the `AssignmentGrade` type
  const { grade } = req.body as AssignmentGrade;
  //   Get the current average and weights from the student's data
  // const currentavg = currentAverage.Student;
  const currentavg = studentData.currentAverage;
  // const weight = studentData.weights;
  const finaWeight = studentData.weights.finalExamWeight;

  //   Calculate the final score that would receive using
  // their current average and the hypothetical final exam grade.
  const overallScore = (currentavg * (100 - finaWeight) + grade * finaWeight) / 100;

  // const finalExamScore = calculateFinalExamScore(currentAverage, finalExamWeight, grade);
  // const overallScore = currentAverage + finalExamScore;
  // (currentAverage * (100 - finalExamWeight)) / 100 + (finalExamScore * finalExamWeight) / 100;
  //   Get the letter grade they would receive given this score
  const letterGrade = getLetterGrade(overallScore);

  //   Send back a JSON response containing their `overallScore` and `letterGrade.
  res.json({ overallScore, letterGrade });
}
function updateGrade(req: Request, res: Response): void {
  //   Get the student's name and assignment name from the path parameters as a `GradeUpdateParams`
  const { studentName, assignmentName } = req.params as GradeUpdateParams;
  //   Get the grade from the request body as an `AssignmentGrade`
  const { grade } = req.body as AssignmentGrade;
  //   Update the student's grade
  const update = updateStudentGrade(studentName, assignmentName, grade);
  //   If the update did not complete (this means the student or the assignment wasn't found)
  if (!update) {
    //   respond with status 404 Not Found
    res.sendStatus(404);
    //   terminate the function immediately
    return;
  }

  //   Respond with status 200 OK
  res.sendStatus(200);
}

export default {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
