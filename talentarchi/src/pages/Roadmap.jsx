import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RoadmapItem from '../components/RoadmapItem';
import ProgressBar from '../components/ProgressBar';

const Roadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [filter, setFilter] = useState('all');

  // 🔗 FETCH ROADMAP FROM BACKEND
  useEffect(() => {
    fetch('https://precision-talent-architect.onrender.com/api/roadmap')
      .then(res => res.json())
      .then(data => setRoadmapItems(data))
      .catch(err => console.error('Roadmap fetch error:', err));
  }, []);

  const filteredItems = roadmapItems.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const handleToggleItem = (id) => {
    setRoadmapItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          if (item.status === 'completed') {
            return {
              ...item,
              status: 'in-progress',
              progress: item.progress < 100 ? Math.min(item.progress + 25, 100) : 0,
            };
          } else if (item.status === 'in-progress') {
            return { ...item, status: 'completed', progress: 100 };
          } else {
            return { ...item, status: 'in-progress', progress: 25 };
          }
        }
        return item;
      })
    );
  };

  const completedCount = roadmapItems.filter(item => item.status === 'completed').length;
  const inProgressCount = roadmapItems.filter(item => item.status === 'in-progress').length;

  const totalHours = roadmapItems.reduce((acc, item) => {
    const hours = parseInt(item.duration) || 0;
    return acc + hours;
  }, 0);

  const completedHours = roadmapItems
    .filter(item => item.status === 'completed')
    .reduce((acc, item) => acc + (parseInt(item.duration) || 0), 0);

  const filters = [
    { value: 'all', label: 'All Items' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Learning Roadmap</h1>
        <p className="text-gray-600 mt-1">Your personalized path to career success</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-3xl font-bold">{completedCount}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-600 mb-1">In Progress</p>
          <p className="text-3xl font-bold">{inProgressCount}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Hours</p>
          <p className="text-3xl font-bold">{totalHours}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Completed Hours</p>
          <p className="text-3xl font-bold">{completedHours}</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="card">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <span className="font-bold">
            {roadmapItems.length
              ? Math.round((completedCount / roadmapItems.length) * 100)
              : 0}
            %
          </span>
        </div>
        <ProgressBar
          progress={
            roadmapItems.length
              ? Math.round((completedCount / roadmapItems.length) * 100)
              : 0
          }
          color="primary"
          size="lg"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === f.value
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Roadmap Items */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No roadmap items found</p>
      ) : (
        <div className="space-y-4">
          {filteredItems.map(item => (
            <RoadmapItem
              key={item.id}
              item={item}
              onToggle={handleToggleItem}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Roadmap;