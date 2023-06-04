import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddNewSpaceDialog({ open, setOpen }: Props) {
  const [name, setName] = useState<string | null>(null);
  const handleClose = () => {
    setOpen(false);
  };

  const onAddSpaceRequest = () => {
    console.log("new space requested: ", name);
    // todo send new space request

    handleClose();
    setName(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Space</DialogTitle>
      <DialogContent>
        <DialogContentText>To add a new space, please enter its name here:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="space-name"
          label="Space Name"
          fullWidth
          variant="standard"
          value={name ?? ""}
          onChange={({ target: { value } }) => setName(value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onAddSpaceRequest}>Add Space</Button>
      </DialogActions>
    </Dialog>
  );
}
