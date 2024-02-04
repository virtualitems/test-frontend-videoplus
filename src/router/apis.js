export const endpoints = {
  auth: {
    index: '/auth',
    login: '/auth/login',
    logout: '/auth/logout',
  },
  persons: {
    list: '/users',
    model: '/users/:slug',
    register: '/users/register',
  },
  videos: {
    list: '/videos',
    model: '/videos/:slug',
    interactions: '/videos/:slug/interactions',
  }
};


export const baseURL = 'http://localhost:3000';
