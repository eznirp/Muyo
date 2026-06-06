const API_URL = import.meta.env.VITE_API_URL || 'https://muyo-sofly.vercel.app/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

// Auth APIs
export const authSignUp = (userData) =>
  apiCall('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const authSignIn = (email, password) =>
  apiCall('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

// User APIs
export const getUsers = () =>
  apiCall('/users');

export const getUser = (id) =>
  apiCall(`/users/${id}`);

export const createUser = (userData) =>
  apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const updateUser = (id, userData) =>
  apiCall(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });

export const deleteUser = (id) =>
  apiCall(`/users/${id}`, {
    method: 'DELETE',
  });

// Article APIs
export const getArticles = () =>
  apiCall('/articles');

export const getArticleById = (id) =>
  apiCall(`/articles/${id}`);

export const getArticleByName = (name) =>
  apiCall(`/articles/name/${name}`);

export const getDashboardArticles = () =>
  apiCall('/articles/dashboard/all');

export const createArticle = (articleData) =>
  apiCall('/articles', {
    method: 'POST',
    body: JSON.stringify(articleData),
  });

export const updateArticle = (id, articleData) =>
  apiCall(`/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(articleData),
  });

export const deleteArticle = (id) =>
  apiCall(`/articles/${id}`, {
    method: 'DELETE',
  });

// Dashboard APIs
export const getDashboardStats = () =>
  apiCall('/dashboard/stats/overview');

export const getUserStats = () =>
  apiCall('/dashboard/stats/users');

export const getArticleStats = () =>
  apiCall('/dashboard/stats/articles');

export const getActivityReports = () =>
  apiCall('/dashboard/reports/activity');
