import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog"; // Importez le composant Dialog
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";
import { fetchUserData, updateUserData } from "../Api/EditApi";

function EditUser() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [open, setOpen] = useState(false); // pour gérer l'ouverture/fermeture du modal
  const [successMessage, setSuccessMessage] = useState(""); // pour stocker le message de succès
  const navigate = useNavigate();

  useEffect(() => {
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
    updateUserData(id, formData)
      .then((res) => {
        setSuccessMessage("Données mises à jour avec succès !");
        setOpen(true); // Ouvrir le modal en cas de succès
      })
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    setOpen(false); // Fermer le modal
    navigate("/"); // Rediriger l'utilisateur
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

     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Succès</DialogTitle>
        <DialogContent>
          {successMessage}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EditUser;
