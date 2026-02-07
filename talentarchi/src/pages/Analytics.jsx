import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const Analytics = () => {
  const [studentProgress, setStudentProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔗 FETCH FROM BACKEND
  useEffect(() => {
    fetch('https://precision-talent-architect.onrender.com/api/student-progress')
      .then(res => res.json())
      .then(data => {
        setStudentProgress(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading || !studentProgress) {
    return <div className="p-8 text-gray-600">Loading Analytics...</div>;
  }

  // derived data (same logic as before)
  const testScores = studentProgress.testScores.map(item => ({
    ...item,
    score: item.score + Math.floor(Math.random() * 10) - 5,
  }));

  const improvementData = [
    { month: 'Jan', improvement: 5, target: 8 },
    { month: 'Feb', improvement: 12, target: 16 },
    { month: 'Mar', improvement: 18, target: 24 },
    { month: 'Apr', improvement: 25, target: 32 },
    { month: 'May', improvement: 35, target: 40 },
    { month: 'Jun', improvement: 42, target: 48 },
  ];

  const skillProgress = [
    { skill: 'JavaScript', progress: 85 },
    { skill: 'React', progress: 70 },
    { skill: 'Python', progress: 55 },
    { skill: 'Node.js', progress: 45 },
    { skill: 'SQL', progress: 60 },
    { skill: 'Machine Learning', progress: 30 },
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 3 },
    { day: 'Tue', hours: 5 },
    { day: 'Wed', hours: 4 },
    { day: 'Thu', hours: 2 },
    { day: 'Fri', hours: 6 },
    { day: 'Sat', hours: 8 },
    { day: 'Sun', hours: 4 },
  ];

  const stats = [
    { title: 'Total Study Hours', value: '156', change: '+12%', positive: true },
    { title: 'Avg. Test Score', value: `${studentProgress.overallScore}%`, change: '+5%', positive: true },
    { title: 'Skills Improved', value: studentProgress.skillsAcquired, change: '+2', positive: true },
    { title: 'Learning Streak', value: '12 days', change: 'Active', positive: true },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Progress Analytics</h1>
        <p className="text-gray-600 mt-1">Track your learning journey and improvement</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div key={stat.title} className="card">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <div className="flex justify-between items-end">
              <p className="text-3xl font-bold">{stat.value}</p>
              <span className="text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Test Scores */}
        <div className="card">
          <h3 className="font-semibold mb-4">Test Scores Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={testScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Area dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Improvement */}
        <div className="card">
          <h3 className="font-semibold mb-4">Improvement vs Target</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={improvementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="improvement" fill="#6366f1" />
              <Bar dataKey="target" fill="#e5e7eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Career Readiness */}
      <div className="card bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <h3 className="text-xl font-semibold mb-2">Career Readiness Score</h3>
        <p className="text-4xl font-bold">{studentProgress.careerReadinessScore}%</p>
      </div>
    </motion.div>
  );
};

export default Analytics;