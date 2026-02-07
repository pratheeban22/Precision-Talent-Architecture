// API Service - Mock API for Precision Talent Architect
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Functions
export const authAPI = {
  register: async (userData) => {
    // Mock registration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: { id: 1, ...userData },
            token: 'mock-jwt-token',
          },
        });
      }, 1000);
    });
  },

  login: async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: { id: 1, name: credentials.email.split('@')[0] },
            token: 'mock-jwt-token',
          },
        });
      }, 1000);
    });
  },
};

export const assessmentAPI = {
  getQuestions: async (skill) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { questions: [] } });
      }, 500);
    });
  },

  submitAssessment: async (answers) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            score: Math.floor(Math.random() * 40) + 60,
            weakSkills: ['Docker', 'AWS', 'Machine Learning'],
            recommendations: ['Focus on cloud fundamentals', 'Practice more with containers'],
          },
        });
      }, 1500);
    });
  },
};

export const skillsAPI = {
  getIndustrySkills: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { skills: [] } });
      }, 500);
    });
  },

  getStudentSkills: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { skills: [] } });
      }, 500);
    });
  },
};

export const roadmapAPI = {
  getRoadmap: async (careerGoal) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { roadmap: [] } });
      }, 500);
    });
  },

  updateProgress: async (itemId, progress) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true } });
      }, 300);
    });
  },
};

export const analyticsAPI = {
  getProgressData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { progress: null } });
      }, 500);
    });
  },
};

export const adminAPI = {
  getJobRoles: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { jobRoles: [] } });
      }, 500);
    });
  },

  addJobRole: async (jobRole) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true, jobRole } });
      }, 500);
    });
  },

  getStudents: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { students: [] } });
      }, 500);
    });
  },
};

export default api;
