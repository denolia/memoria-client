import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../Auth/AuthContext";
import { getUsernameInitials } from "../Auth/utils";
import { fetchSpaceById } from "./api/fetchSpaceById";
import InviteNewUserToSpaceDialog from "./InviteNewUserDialog";
import { SpaceDef } from "./types";

export function ManageSpace() {
  const { spaceId } = useParams();
  const [_space, setSpace] = useState<SpaceDef>(null);
  const { user } = useAuth();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  useEffect(() => {
    if (!spaceId) {
      return;
    }
    const res = await fetchSpaceById(spaceId, user?.jwt);

    if (res?.data) {
      setSpace(res.data);
    }
  }, [spaceId]);

  const participant = { username: "test" };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" color="textSecondary">
        Space
      </Typography>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ width: 32, height: 32 }}>
              {getUsernameInitials(participant?.username)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.username} secondary="Participant/Owner" />
        </ListItem>

        <Divider />

        <ListItemButton onClick={() => setInviteModalOpen(true)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText secondary="Invite new user…" />
        </ListItemButton>
      </List>

      <InviteNewUserToSpaceDialog
        spaceId={spaceId}
        open={inviteModalOpen}
        setOpen={setInviteModalOpen}
      />
    </Container>
  );
}
