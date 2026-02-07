import { motion } from 'framer-motion';

const ProgressBar = ({ progress, color = 'primary', size = 'md', showLabel = true }) => {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colors = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    accent: 'bg-gradient-to-r from-accent-400 to-accent-500',
    green: 'bg-gradient-to-r from-green-400 to-green-500',
    yellow: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
    red: 'bg-gradient-to-r from-red-400 to-red-500',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
