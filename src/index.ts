import express, { Express } from 'express';
import { notImplemented } from './controllers/NotImplementedController';

const app: Express = express();
const PORT = 8091;

app.get(`/api/students`, notImplemented);
app.post(`/api/students`, notImplemented);
// have personalize path
// GET http://localhost:8091/api/students/Alice
app.get(`/api/students/:studentName`, notImplemented);

app.get(`/api/students/:studentName/finalExam`, notImplemented);
app.post(`/api/students/:studentName/finalExam`, notImplemented);

app.get(`/api/students/:studentName/grades/:assignmentName`, notImplemented);
app.post(`/api/students/:studentName/grades/:assignmentName`, notImplemented);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
