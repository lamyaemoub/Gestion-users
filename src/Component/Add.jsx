import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { createUser, checkEmailExists } from "../Api/UserApi"; // Assurez-vous d'importer la fonction de vérification de l'email
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est requis"),
      email: Yup.string()
        .email("L'adresse e-mail n'est pas valide")
        .required("L'adresse e-mail est requise"),
    }),
    onSubmit: async (values) => {
      try {
        const emailExists = await checkEmailExists(values.email);

        if (emailExists) {
          // L'email existe déjà, ouvrez le modal
          setOpen(true);
        } else {
          await createUser(values);
          alert("Données ajoutées avec succès !");
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleClose = () => {
    
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <form onSubmit={formik.handleSubmit} style={{ textAlign: "center" }}>
        <TextField
          label="Nom"
          variant="outlined"
          fullWidth
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
          margin="normal"
          style={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Soumettre
        </Button>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Erreur</DialogTitle>
        <DialogContent>
          Cet email existe déjà. Veuillez en choisir un autre.
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

export default Add;
