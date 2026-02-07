import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';

const RoadmapItem = ({ item, onToggle, onProgressUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeIcons = {
    course: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    project: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    assessment: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  };

  const statusColors = {
    completed: 'bg-green-100 text-green-700 border-green-200',
    'in-progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    pending: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <motion.div
      layout
      className={`relative pl-8 pb-8 ${item.status !== 'completed' ? 'border-l-2 border-gray-200' : 'border-l-2 border-green-300'}`}
    >
      {/* Timeline dot */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute left-0 top-0 -translate-x-1/2 w-12 h-12 rounded-full border-4 bg-white flex items-center justify-center transition-colors ${
          item.status === 'completed'
            ? 'border-green-400 text-green-600'
            : item.status === 'in-progress'
            ? 'border-yellow-400 text-yellow-600'
            : 'border-gray-300 text-gray-400'
        }`}
      >
        {item.status === 'completed' ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          typeIcons[item.type] || typeIcons.course
        )}
      </motion.button>

      {/* Content card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="card cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[item.status]}`}>
                {item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'In Progress' : 'Pending'}
              </span>
              <span className="text-sm text-gray-500">{item.duration}</span>
              <span className="text-sm text-gray-500 capitalize">{item.type}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          </div>
          <div className="flex items-center gap-3">
            {item.status === 'in-progress' && (
              <div className="w-24">
                <ProgressBar progress={item.progress} size="sm" />
              </div>
            )}
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Skills Covered:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-3">
                  {item.status !== 'completed' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle?.(item.id);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        item.status === 'in-progress'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      }`}
                    >
                      {item.status === 'in-progress' ? 'Mark Complete' : 'Start Item'}
                    </button>
                  )}
                  <a
                    href={item.resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    View Resource
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default RoadmapItem;
