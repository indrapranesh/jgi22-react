import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { textAlign } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../constants/url.constants";
import history from "../history";

function Audits() {
  const columns = ["Audit Name", "Created Date", "Status"];
  const [dialog, setDialog] = useState(false);
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [auditForm, setAuditForm] = useState({
    name: '',
    version: '',
    description: ''
  })

     const handleOpen = () => {
        setDialog(true)
     }

     const handleClose = () => {
        setDialog(false)
     }

     const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

     const createAudit = () => {
        const body = auditForm;
        body['initialVersion'] = auditForm.version;
        axios.post(`${BACKEND_URL}audits`, body)
        .then((resp) => {
          console.log(resp);
          axios.post(`${BACKEND_URL}review/send?auditId=${resp.data.id}`, {})
          .then((res) => {
            setOpen(true);
            setMessage('Reviewers are notified')
          });
          history.push(`/audits/${resp.data.id}`);
        })
        handleClose();
     }

  return (
    <>
      <div className="p-3">
        <div className="flex justify-end">
          <Button variant="contained" onClick={handleOpen}>Create Audit</Button>
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
                <TableRow>
                  <TableCell colSpan={3} style={{'textAlign': 'center'}}>No audits found</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>


      <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle className="font-bold">Create new Audit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new audit and view the new camera trap deployments and their images.
          </DialogContentText>
            <div className="pt-3">
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Audit Name"
                type="text"
                fullWidth
                variant="standard"
                required
                value={auditForm.name}
                onChange={(e) => setAuditForm({...auditForm, name: e.target.value})}
            />
            <TextField
                margin="dense"
                id="name"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                required
                value={auditForm.description}
                onChange={(e) => setAuditForm({...auditForm, description: e.target.value})}
            />
            <TextField
                margin="dense"
                id="version"
                label="Version"
                type="text"
                fullWidth
                variant="standard"
                required
                value={auditForm.version}
                onChange={(e) => setAuditForm({...auditForm, version: e.target.value})}
            />
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createAudit}>Create</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
         autoHideDuration={3000}
        open={open}
        message={message}
        onClose={handleSnackClose}
      />
    </>
  );
}

export default Audits;
