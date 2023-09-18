import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { fetchUserData, updateUserData } from "../Api/EditApi";

function EditUser() {
  const { id } = useParams(); // Obtenez l'ID de l'URL
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Chargez les données de l'utilisateur à partir de l'API en utilisant l'ID
    fetchUserData(id)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Utilisez la fonction pour mettre à jour les données de l'utilisateur
    updateUserData(id, formData)
      .then((res) => {
        alert("Données mises à jour avec succès !");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };


  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
          style={{ marginBottom: "16px" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          margin="normal"
          style={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Enregistrer
        </Button>
      </form>
    </Container>
  );
}

export default EditUser;
