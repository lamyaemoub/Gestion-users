import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { deleteUser } from "./Api/DeleteApi";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

function App() {
  
  const [openDialog, setOpenDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const columnOrder = ["id", "Name", "Email"];


  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);


 useEffect(() => {
  axios.get('http://localhost:3030/users')
    .then(res => {
      setColumns(columnOrder);
      setRecords(res.data);
    })
}, [columnOrder]) 

  const handleDelete = (userId) => {
    deleteUser(userId)
      .then(() => {
        // Supprimez l'utilisateur de la liste côté client
        setRecords((prevRecords) => prevRecords.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression :', error);
        // Gérez les erreurs de suppression ici
      });
  };

  const openDeleteDialog = (userId) => {
    setUserIdToDelete(userId);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setUserIdToDelete(null);
    setOpenDialog(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="text-end"> 
        <Button variant="contained" color="primary"  component={Link} to="/create">
          Ajouter +
        </Button>
      </div>
      <TableContainer style={{ margin: '0 20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((c, i) => (
                <TableCell key={i}>{c}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.email}</TableCell>
                <TableCell>
                  <Link to={`/edit/${d.id}`}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton color="secondary" onClick={() => openDeleteDialog(d.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Annuler
          </Button>
          <Button
            onClick={() => {
              handleDelete(userIdToDelete);
              closeDeleteDialog();
            }}
            color="secondary"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;