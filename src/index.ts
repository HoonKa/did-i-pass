import express, { Express } from 'express';
// import chalk from 'chalk';
import StudentController from './controllers/StudentController';

const app: Express = express();
const PORT = 8091;

// Enable JSON request body parsing
app.use(express.json()); // register global ware

app.get(`/api/students`, StudentController.getAllStudents);
app.post(`/api/students`, StudentController.createNewStudent);
// have personalize path
// GET http://localhost:8091/api/students/Alice

app.get(`/api/students/:studentName`, StudentController.getStudentByName);
// app.get(`/api/students/:studentName`, getStudent);

app.get(`/api/students/:studentName/finalExam`, StudentController.getFinalExamScores);
app.post(`/api/students/:studentName/finalExam`, StudentController.calcFinalScore);

// app.get(`/api/students/:studentName/grades/:assignmentName`, StudentController.updateGrade);
app.post(`/api/students/:studentName/grades/:assignmentName`, StudentController.updateGrade);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
