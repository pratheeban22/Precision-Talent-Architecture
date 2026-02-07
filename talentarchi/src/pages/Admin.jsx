import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('job-roles');

  const [jobRoles, setJobRoles] = useState([]);
  const [students, setStudents] = useState([]);
  const [industrySkills, setIndustrySkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newJobRole, setNewJobRole] = useState({
    title: '',
    requiredSkills: [],
    avgSalary: '',
    demand: 'Medium',
    growthRate: '',
  });
  const [skillInput, setSkillInput] = useState('');

  // 🔗 FETCH FROM BACKEND
  useEffect(() => {
    Promise.all([
      fetch('https://precision-talent-architect.onrender.com/api/job-roles').then(res => res.json()),
      fetch('https://precision-talent-architect.onrender.com/api/students').then(res => res.json()),
      fetch('https://precision-talent-architect.onrender.com/api/skills').then(res => res.json()),
    ])
      .then(([roles, studentsData, skills]) => {
        setJobRoles(roles);
        setStudents(studentsData.students);
        setIndustrySkills(skills);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-600">Loading Admin Panel...</div>;
  }

  const tabs = [
    { id: 'job-roles', label: 'Job Roles' },
    { id: 'students', label: 'Students' },
    { id: 'skills', label: 'Industry Skills' },
  ];

  const addSkill = () => {
    if (skillInput.trim() && !newJobRole.requiredSkills.includes(skillInput.trim())) {
      setNewJobRole(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setNewJobRole(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill),
    }));
  };

  const handleAddJobRole = (e) => {
    e.preventDefault();
    const newRole = {
      id: jobRoles.length + 1,
      ...newJobRole,
    };
    setJobRoles(prev => [...prev, newRole]);
    setShowAddModal(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-gray-600">Manage job roles, students & skills</p>
        </div>
        {activeTab === 'job-roles' && (
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            Add Job Role
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab.id ? 'bg-primary-600 text-white' : 'bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* JOB ROLES */}
      {activeTab === 'job-roles' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobRoles.map(role => (
            <div key={role.id} className="card">
              <h3 className="font-semibold text-lg">{role.title}</h3>
              <p className="text-sm text-gray-500">{role.avgSalary}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {role.requiredSkills.map(skill => (
                  <span key={skill} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-sm mt-2">Growth: {role.growthRate}</p>
            </div>
          ))}
        </div>
      )}

      {/* STUDENTS */}
      {activeTab === 'students' && (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Stream</th>
                <th className="text-left p-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.stream}</td>
                  <td className="p-3">{student.overallScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SKILLS */}
      {activeTab === 'skills' && (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Skill</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Importance</th>
                <th className="text-left p-3">Demand</th>
              </tr>
            </thead>
            <tbody>
              {industrySkills.map(skill => (
                <tr key={skill.skill} className="border-b">
                  <td className="p-3">{skill.skill}</td>
                  <td className="p-3">{skill.category}</td>
                  <td className="p-3">{skill.importance}%</td>
                  <td className="p-3">{skill.demand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD JOB ROLE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add Job Role</h2>
            <form onSubmit={handleAddJobRole} className="space-y-3">
              <input
                className="input-field"
                placeholder="Job Title"
                value={newJobRole.title}
                onChange={e => setNewJobRole({ ...newJobRole, title: e.target.value })}
                required
              />
              <input
                className="input-field"
                placeholder="Avg Salary"
                value={newJobRole.avgSalary}
                onChange={e => setNewJobRole({ ...newJobRole, avgSalary: e.target.value })}
                required
              />
              <input
                className="input-field"
                placeholder="Growth Rate"
                value={newJobRole.growthRate}
                onChange={e => setNewJobRole({ ...newJobRole, growthRate: e.target.value })}
                required
              />

              <div className="flex gap-2">
                <input
                  className="input-field flex-1"
                  placeholder="Add skill"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                />
                <button type="button" onClick={addSkill} className="btn-secondary">
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {newJobRole.requiredSkills.map(skill => (
                  <span key={skill} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-1 text-red-500">×</button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Admin;