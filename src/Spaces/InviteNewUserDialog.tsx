import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { requestInviteUserToSpace } from "./api/requestInviteUserToSpace";

interface Props {
  spaceId: string | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function InviteNewUserToSpaceDialog({ spaceId, open, setOpen }: Props) {
  const { user } = useAuth();
  const [invitee, setInvitee] = useState<string | null>(null);
  const handleClose = () => {
    setOpen(false);
  };
  // todo fetch all users

  const onInviteRequest = async () => {
    // todo get invitee id
    if (!spaceId || !invitee) {
      return;
    }
    const addRes = await requestInviteUserToSpace(spaceId, invitee, user?.jwt);

    if (addRes?.data) {
      // todo
      console.log("Optimistically add user to the list");
    }
    handleClose();
    setInvitee(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Invite New User to the Space</DialogTitle>
      <DialogContent>
        <DialogContentText>Please select a user to invite:</DialogContentText>
        {/* TODO add autocomplete field */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onInviteRequest}>Invite</Button>
      </DialogActions>
    </Dialog>
  );
}
