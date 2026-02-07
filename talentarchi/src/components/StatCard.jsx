import { motion } from 'framer-motion';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'primary', trend }) => {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-400 to-accent-500',
    green: 'from-green-400 to-green-500',
    yellow: 'from-yellow-400 to-yellow-500',
    red: 'from-red-400 to-red-500',
  };

  const bgColors = {
    primary: 'bg-primary-50',
    accent: 'bg-accent-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    red: 'bg-red-50',
  };

  const iconColors = {
    primary: 'text-primary-600',
    accent: 'text-accent-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="card"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${bgColors[color]}`}>
          {Icon && (
            <Icon className={`w-6 h-6 ${iconColors[color]}`} />
          )}
        </div>
        {trend && (
          <span className={`text-sm font-medium ${
            trend.up ? 'text-green-600' : trend.down ? 'text-red-600' : 'text-gray-500'
          }`}>
            {trend.up ? '↑' : trend.down ? '↓' : '→'} {trend.value}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
