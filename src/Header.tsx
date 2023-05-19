import { Logout } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import Logo from "./assets/lighthouse.svg";
import { useAuth } from "./Auth/AuthContext";
import { useMuiMenu } from "./helpers/hooks/useMuiMenu";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
}

function AccountArea() {
  const theme = useTheme();

  const { isLoggedIn, userInitials, logout } = useAuth();
  const { open, handleClick, anchorEl, handleClose } = useMuiMenu();

  const onLogout = () => {
    logout();
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
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={handleClose}> */}
        {/*  <Avatar /> Profile */}
        {/* </MenuItem> */}
        {/* <MenuItem onClick={handleClose}> */}
        {/*  <Avatar /> My account */}
        {/* </MenuItem> */}
        {/* <Divider /> */}
        {/* <MenuItem onClick={handleClose}> */}
        {/*  <ListItemIcon> */}
        {/*    <PersonAdd fontSize="small" /> */}
        {/*  </ListItemIcon> */}
        {/*  Add another account */}
        {/* </MenuItem> */}
        {/* <MenuItem onClick={handleClose}> */}
        {/*  <ListItemIcon> */}
        {/*    <Settings fontSize="small" /> */}
        {/*  </ListItemIcon> */}
        {/*  Settings */}
        {/* </MenuItem> */}
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export function Header({ sections }: HeaderProps) {
  const theme = useTheme();

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <LinkRouter to="/">
          <img src={Logo} width="40" height="40" alt="Logo" />
        </LinkRouter>

        <Typography
          component="h2"
          variant="h5"
          align="left"
          noWrap
          sx={{ flex: 1, ml: 2, color: "grey.800" }}
        >
          memoria
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <AccountArea />
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "flex-start", overflowX: "auto" }}
      >
        {sections.map(({ title: sectionTitle, url }) => (
          <LinkRouter
            key={sectionTitle}
            to={url}
            style={{
              color: theme.palette.primary.dark,
              marginRight: theme.spacing(2),
            }}
          >
            {sectionTitle}
          </LinkRouter>
        ))}
      </Toolbar>
    </>
  );
}
