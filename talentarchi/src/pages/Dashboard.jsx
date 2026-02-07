import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RadarChart from '../components/RadarChart';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [industrySkills, setIndustrySkills] = useState([]);
  const [studentSkills, setStudentSkills] = useState([]);
  const [studentProgress, setStudentProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔗 FETCH ALL DASHBOARD DATA
  useEffect(() => {
    Promise.all([
      fetch('https://precision-talent-architect.onrender.com/api/skills').then(res => res.json()),
      fetch('https://precision-talent-architect.onrender.com/api/student-skills').then(res => res.json()),
      fetch('https://precision-talent-architect.onrender.com/api/student-progress').then(res => res.json()),
    ])
      .then(([skills, studentSkillsData, progress]) => {
        setIndustrySkills(skills);
        setStudentSkills(studentSkillsData);
        setStudentProgress(progress);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading || !studentProgress) {
    return <div className="p-8 text-gray-600">Loading Dashboard...</div>;
  }

  const skills = industrySkills.map(s => s.skill);

  // 🔍 SKILL GAP CALCULATION
  const weakSkills = industrySkills
    .map(industry => {
      const student = studentSkills.find(s => s.skill === industry.skill);
      const gap = industry.importance - (student?.score || 0);
      return {
        skill: industry.skill,
        industryImportance: industry.importance,
        studentScore: student?.score || 0,
        gap,
        category: industry.category,
      };
    })
    .filter(s => s.gap > 20)
    .sort((a, b) => b.gap - a.gap);

  const strongSkills = studentSkills.filter(s => s.score >= 70);

  const stats = [
    {
      title: 'Career Readiness',
      value: `${studentProgress.careerReadinessScore}%`,
      subtitle: 'Based on industry standards',
      color: 'primary',
    },
    {
      title: 'Skills Gap',
      value: weakSkills.length,
      subtitle: 'Skills to develop',
      color: 'yellow',
    },
    {
      title: 'Roadmap Progress',
      value: `${studentProgress.roadmapCompletion}%`,
      subtitle: 'Of learning path completed',
      color: 'accent',
    },
    {
      title: 'Tests Completed',
      value: studentProgress.testScores.length,
      subtitle: 'Skill assessments taken',
      color: 'green',
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Skill Gap Dashboard</h1>
          <p className="text-gray-600">Compare your skills with industry requirements</p>
        </div>
        <Link to="/assessment" className="btn-primary">
          Take New Assessment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Radar Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Skills Comparison</h2>
        <RadarChart
          studentData={studentSkills}
          industryData={industrySkills}
          skills={skills.slice(0, 8)}
        />
      </div>

      {/* Skill Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weak Skills */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Priority Skills to Develop</h3>
          <div className="space-y-3">
            {weakSkills.slice(0, 5).map(skill => (
              <div key={skill.skill} className="flex justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{skill.skill}</p>
                  <p className="text-sm text-gray-500">{skill.category}</p>
                </div>
                <span className="text-red-600 font-medium">{skill.gap}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strong Skills */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Your Strengths</h3>
          <div className="grid grid-cols-2 gap-4">
            {strongSkills.map(skill => (
              <div key={skill.skill} className="p-3 bg-green-50 rounded">
                <p className="font-medium">{skill.skill}</p>
                <p className="text-green-600">{skill.score}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;