import { Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Snackbar } from '@mui/material';
import { create } from '@mui/material/styles/createTransitions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../constants/url.constants';


function Reviewers() {
  const columns = ["Reviewer Name", "Email", "Designation"];
  const [users, setUsers] = useState([] as Array<any>)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    designation: ''
  })

  const [dialog, setDialog] = useState(false)

  const handleOpen  = () => {
    setDialog(true)
  }

  const handleClose = () => {
    setUserForm({
      name: '',
      email: '',
      designation: ''
    })
    setDialog(false)
  }

  const getUsers = () => {
    axios.get(`${BACKEND_URL}users`)
    .then((res) => setUsers(res.data));
  }

  const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getUsers();
  }, [])


  const createUser = () => {
    axios.post(`${BACKEND_URL}users`, userForm)
    .then((res) => {
      setDialog(false);
      getUsers();
      setOpen(true);
      setMessage('Reviewer Created')
    })
  }


  return (
    <>
      <div className="p-3">
        <div className="flex justify-end">
          <Button variant="contained" onClick={handleOpen}>Create New Reviewer</Button>
        </div>
        <div className="pt-3">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell key={index} align="center" style={{'fontWeight': 'bold'}}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  (users.length > 0) ? (
                    users.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell style={{'textAlign': 'center'}}>{user.name}</TableCell>
                        <TableCell style={{'textAlign': 'center'}}>{user.email}</TableCell>
                        <TableCell style={{'textAlign': 'center'}}>{user.designation}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                        <TableCell colSpan={3} style={{'textAlign': 'center'}}>No reviewers found</TableCell>
                       </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle className="font-bold">Create new Reviewer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new reviewer and add them to the upcoming audits.
          </DialogContentText>
            <div className="pt-3">
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Reviewer Name"
                type="text"
                fullWidth
                variant="standard"
                required
                value={userForm.name}
                onChange={(e) => setUserForm({...userForm, name: e.target.value})}
            />
            <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                required
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
            />
            <TextField
                margin="dense"
                id="designation"
                label="Designation"
                type="text"
                fullWidth
                variant="standard"
                required
                value={userForm.designation}
                onChange={(e) => setUserForm({...userForm, designation: e.target.value})}
            />
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createUser}>Create</Button>
        </DialogActions>
      </Dialog>
      </div> 
      <Snackbar
         autoHideDuration={3000}
        open={open}
        message={message}
        onClose={handleSnackClose}
      />
    </>
  );
}

export default Reviewers;