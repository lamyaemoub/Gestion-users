import axios from "axios";


export const deleteUser = (userId) => {
  return axios.delete(`http://localhost:3030/users/${userId}`);
};