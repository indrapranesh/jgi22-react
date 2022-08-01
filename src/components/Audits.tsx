import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { textAlign } from "@mui/system";
import React, { useState } from "react";

function Audits() {
  const columns = ["Audit Name", "Created Date", "Status"];
  const [dialog, setDialog] = useState(false);
  const [auditForm, setAuditForm] = useState({
    name: '',
    version: '',
    mapUrl: ''
  })

     const handleOpen = () => {
        setDialog(true)
     }

     const handleClose = () => {
        setDialog(false)
     }

     const createAudit = () => {
        console.log(auditForm)
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
                id="version"
                label="Version"
                type="text"
                fullWidth
                variant="standard"
                required
                value={auditForm.version}
                onChange={(e) => setAuditForm({...auditForm, version: e.target.value})}
            />
            <TextField
                margin="dense"
                id="mapUrl"
                label="Map URL"
                type="text"
                fullWidth
                variant="standard"
                required
                value={auditForm.mapUrl}
                onChange={(e) => setAuditForm({...auditForm, mapUrl: e.target.value})}
            />
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createAudit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Audits;
