import { Request, Response } from 'express';
import { getStudentData, addStudent, getStudent, calculateAverages } from '../models/StudentModel';

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

  // for (const grade of studentData.weights.assignmentWeights) {
  //   subtotal += grade.weight;
  // }
  // subtotal += studentData.weights.finalExamWeight;

  for (const grade of studentData.weights.assignmentWeights) {
    subtotal += (grade.grade * grade.weight) / (100 - studentData.weights.finalExamWeight);
  }

  if (subtotal !== 100) {
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
  res.sendStatus(501);
}

function getFinalExamScores(req: Request, res: Response): void {
  // TODO: Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;
  // TODO: Get the student's data from the dataset
  const studentData = getStudentData(studentName);
  // TODO: If the student was not found
  if (!studentData) {
    // TODO: responds with status 404 Not Found
    res.sendStatus(404);
    // TODO: terminate the function
    return;
  }
  // TODO: Get the current average and weights from the student's data
  const currentAverage = calculateAverages(studentData);
  const weights = 0;
  let grade: string;

  // TODO: Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  if (currentAverage >= 90) {
    grade = 'A';
    console.log(`The grade is ${grade}.`);
  }
  // TODO: Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  else if (currentAverage >= 80 && currentAverage < 90) {
    grade = 'B';
    console.log(`The grade is ${grade}.`);
  }

  // TODO: Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  else if (currentAverage >= 70 && currentAverage < 80) {
    grade = 'C';
    console.log(`The grade is ${grade}.`);
  }
  // TODO: Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  else if (currentAverage < 70) {
    grade = 'D';
    console.log(`The grade is ${grade}.`);
  } else {
    grade = 'F';
    console.log(`The grade is ${grade}.`);
  }

  // TODO: Send a JSON response with an object containing the grades needed for an A through D
}

export default { getAllStudents, createNewStudent, getStudentByName, getFinalExamScores };
