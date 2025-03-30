// utils/api.ts
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = 'https://reqres.in/api';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
      toast.error('Session expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, { email, password });
    return response.data.token;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const getUsers = async (page: number) => {
  try {
    const response = await axios.get(`${API_BASE}/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const updateUser = async (userId: number, userData: { 
  first_name: string;
  last_name: string;
  email: string;
}) => {
  try {
    await axios.put(`${API_BASE}/users/${userId}`, userData);
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await axios.delete(`${API_BASE}/users/${userId}`);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};