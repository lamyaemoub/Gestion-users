import axios from "axios";

const API_BASE_URL = "http://localhost:3030/users"; // URL de base de l'API

// Fonction pour récupérer les données de l'utilisateur à éditer
export const fetchUserData = (userId) => {
  return axios.get(`${API_BASE_URL}/${userId}`);
};

// Fonction pour mettre à jour les données de l'utilisateur
export const updateUserData = (userId, formData) => {
  return axios.put(`${API_BASE_URL}/${userId}`, formData);
};

