import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog({ open, setOpen, onConfirm, onCancel, title, content }) {
  const handleClose = (confirmed) => {
    setOpen(false);
    if (confirmed) {
      onConfirm();
    } else {
      onCancel && onCancel();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
