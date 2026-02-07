const express = require('express');
const cors = require('cors');

const industrySkills = require('./data/industrySkills');
const studentSkills = require('./data/studentSkills');
const roadmapItems = require('./data/roadmap');
const jobRoles = require('./data/jobRoles');
const students = require('./data/students');
const assessmentQuestions = require('./data/assessment');
const studentProgress = require('./data/studentProgress');

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running 🚀' });
});

// APIs
app.get('/api/skills', (req, res) => {
  res.json(industrySkills);
});

app.get('/api/student-skills', (req, res) => {
  res.json(studentSkills);
});

app.get('/api/student-progress', (req, res) => {
  res.json(studentProgress);
});

app.get('/api/roadmap', (req, res) => {
  res.json(roadmapItems);
});

app.get('/api/job-roles', (req, res) => {
  res.json(jobRoles);
});

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.get('/api/assessment/questions', (req, res) => {
  res.json(assessmentQuestions);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});