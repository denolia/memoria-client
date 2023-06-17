import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useAuth } from "../Auth/AuthContext";
import { requestInviteUserToSpace } from "./api/requestInviteUserToSpace";
import { LoadingBackdrop } from "../Common/LoadingBackdrop";

interface Props {
  spaceId: string | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function InviteNewUserToSpaceDialog({ spaceId, open, setOpen }: Props) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invitee, setInvitee] = useState<{ label: string; value: string } | null>(null);
  const [users, setUsers] = useState<{ label: string; value: string }[]>([]);
  const handleClose = () => {
    setOpen(false);
  };
  // todo fetch all users
  useEffect(() => {
    async function getUsers() {
      const users = await fetchUsers(user?.jwt);

      if (users) {
        setUsers(users.map((user) => ({ label: user.name, value: user.id })));
        setIsLoading(false);
      }
    }
    getUsers();
  }, [spaceId]);

  const onInviteRequest = async () => {
    // todo get invitee id
    if (!spaceId || !invitee) {
      return;
    }
    const addRes = await requestInviteUserToSpace(spaceId, invitee.value, user?.jwt);

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
        {isLoading ? (
          <LoadingBackdrop />
        ) : (
          <>
            <DialogContentText>Please select a user to invite:</DialogContentText>
            <Autocomplete
              id="participant"
              value={invitee}
              onChange={(_, newValue) => setInvitee(newValue)}
              options={users}
              sx={{ mx: { xs: 3, md: 6 }, mt: 2, width: "300px" }}
              renderInput={(params) => <TextField {...params} label="User" variant="standard" />}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onInviteRequest}>Invite</Button>
      </DialogActions>
    </Dialog>
  );
}
