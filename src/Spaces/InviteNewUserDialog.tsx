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
import { fetchAllUsers } from "./api/fetchAllUsers";
import type { SpaceDef } from "./types";

interface Props {
  space: SpaceDef | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  onChange: () => void;
}

export default function InviteNewUserToSpaceDialog({ space, open, setOpen, onChange }: Props) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invitee, setInvitee] = useState<{ label: string; value: string } | null>(null);
  const [users, setUsers] = useState<{ label: string; value: string }[]>([]);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getUsers() {
      const usersRes = await fetchAllUsers(user?.jwt);

      if (usersRes) {
        const participantIds = space?.participants.map((p) => p.id) ?? [];
        setUsers(
          usersRes
            .filter((u) => !participantIds.includes(u.id))
            .map((u) => ({ label: u.name, value: u.id }))
        );
        setIsLoading(false);
      }
    }
    getUsers();
  }, [space?.participants]);

  const onInviteRequest = async () => {
    if (!space?.id || !invitee?.value) {
      return;
    }
    const addRes = await requestInviteUserToSpace(space.id, invitee.value, user?.jwt);

    if (addRes?.data) {
      // todo maybe check the err?
      onChange();
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
