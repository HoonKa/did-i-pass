import { Request, Response } from 'express';
import { getStudentData, addStudent } from '../models/StudentModel';

// import { students, addStudent, getStudent } from '../models/StudentsModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(getStudentData());
}

// function calculateSubtotal(student: Student): number {
//   let subtotal = 0;

//   for (const)
// }

function createNewStudent(req: Request, res: Response): void {
  // console.log(`\nPOST /api/Students`);
  // console.log(req.body);

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

  res.sendStatus(501);
}

export default { getAllStudents, createNewStudent, getStudentByName };
