import axios from "axios";


const BASE_URL = "http://localhost:3030"; 

export const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?email=${email}`);
    return response.data.length > 0; // Si la réponse contient des utilisateurs, l'email existe déjà
  } catch (error) {
    throw error;
  }
};

// Fonction pour créer un nouvel utilisateur tout en vérifiant l'existence de l'email
export const createUser = async (userData) => {
  const { email } = userData;

  try {
   
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      throw new Error("Cet email existe déjà !");
    } else {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};