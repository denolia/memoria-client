import { Logout } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import type { SpaceShort } from "../Auth/types";
import { useMuiMenu } from "../helpers/hooks/useMuiMenu";
import AddNewSpaceDialog from "../Spaces/AddNewSpaceDialog";

export function AccountArea() {
  const theme = useTheme();
  const [addSpaceModalOpen, setAddSpaceModalOpen] = useState(false);

  const { user, currentSpace, switchSpace, isLoggedIn, userInitials, logout } = useAuth();
  const { open, handleClick, anchorEl, handleClose } = useMuiMenu();

  const onLogout = () => {
    logout();
    handleClose();
  };

  const onSpaceClick = (space: SpaceShort) => {
    if (space.id !== currentSpace?.id) {
      switchSpace(space);
    }
    handleClose();
  };

  const onAddSpaceRequest = () => {
    setAddSpaceModalOpen(true);
    handleClose();
  };

  return (
    <>
      {isLoggedIn ? (
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{userInitials}</Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Button variant="outlined" color="success" size="small">
          <LinkRouter
            to="/login"
            style={{
              color: theme.palette.primary.dark,
              textDecoration: "none",
            }}
          >
            Login
          </LinkRouter>
        </Button>
      )}

      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1, mb: 0.5 }}>
          Spaces:
        </Typography>

        {user?.userspaces?.map((space) => (
          <MenuItem
            key={space.id}
            selected={space.id === currentSpace?.id}
            onClick={() => onSpaceClick(space)}
          >
            <ListItemText>{space.name}</ListItemText>

            <LinkRouter
              to={`/spaces/${space.id}`}
              style={{
                color: theme.palette.primary.dark,
                textDecoration: "none",
              }}
            >
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </LinkRouter>
          </MenuItem>
        ))}

        <MenuItem key="add-new-space" onClick={() => onAddSpaceRequest()}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1" color="text.secondary" sx={{ ml: -1 }}>
            Add new space…
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <AddNewSpaceDialog open={addSpaceModalOpen} setOpen={setAddSpaceModalOpen} />
    </>
  );
}
