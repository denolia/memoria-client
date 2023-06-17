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
import type { SpaceDef } from "./types";

export function ManageSpace() {
  const { spaceId } = useParams();
  const [space, setSpace] = useState<SpaceDef | null>(null);
  const { user } = useAuth();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  useEffect(() => {
    async function getSpace() {
      if (!spaceId) {
        return;
      }
      const spaceDef = await fetchSpaceById(spaceId, user?.jwt);

      if (spaceDef) {
        setSpace(spaceDef);
      }
    }
    getSpace();
  }, [spaceId]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" color="textSecondary">
        Space
      </Typography>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {space?.participants.map((participant) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {getUsernameInitials(participant?.username)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={participant.username}
                secondary={space?.owner.username === participant.username ? "Owner" : "Participant"}
              />
            </ListItem>

            <Divider />
          </>
        ))}

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
