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
import { LoadingBackdrop } from "../Common/LoadingBackdrop";

export function ManageSpace() {
  const { spaceId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [space, setSpace] = useState<SpaceDef>();
  const { user } = useAuth();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  async function getSpace() {
    if (!spaceId) {
      return;
    }
    const spaceDef = await fetchSpaceById(spaceId, user?.jwt);

    if (spaceDef) {
      setSpace(spaceDef);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSpace();
  }, [spaceId]);

  if (isLoading){
    return <LoadingBackdrop />
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" color="textSecondary">
        Space: {space?.name}
      </Typography>

      {space?.description && <Typography variant="caption">{space.description}</Typography>}

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {space?.participants.map((participant) => (
          <React.Fragment key={participant.name}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {getUsernameInitials(participant?.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={participant.name}
                secondary={
                  space?.owner && space?.owner?.name === participant.name ? "Owner" : "Participant"
                }
              />
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}

        <ListItemButton onClick={() => setInviteModalOpen(true)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText secondary="Invite new user…" />
        </ListItemButton>
      </List>

      <InviteNewUserToSpaceDialog
        space={space}
        open={inviteModalOpen}
        setOpen={setInviteModalOpen}
        onChange={getSpace}
      />
    </Container>
  );
}
