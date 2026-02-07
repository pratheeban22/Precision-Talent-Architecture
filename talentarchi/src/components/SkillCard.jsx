import { motion } from 'framer-motion';

const SkillCard = ({ skill, score, status = 'not-started', showProgress = false }) => {
  const statusColors = {
    completed: 'bg-green-100 text-green-700 border-green-200',
    'in-progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'not-started': 'bg-gray-100 text-gray-600 border-gray-200',
    weak: 'bg-red-100 text-red-700 border-red-200',
  };

  const progressColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-yellow-500',
    'not-started': 'bg-gray-300',
    weak: 'bg-red-500',
  };

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    'not-started': 'Not Started',
    weak: 'Needs Focus',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="card p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{skill}</h4>
          {score !== undefined && (
            <p className="text-sm text-gray-500">{score}% proficiency</p>
          )}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      
      {showProgress && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{score || 0}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score || 0}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full rounded-full ${progressColors[status]}`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SkillCard;
