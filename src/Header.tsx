import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router";
import { Link as LinkRouter } from "react-router-dom";
import Logo from "./assets/lighthouse.svg";
import { useAuth } from "./Auth/AuthContext";
import type { Space } from "./Auth/types";
import { useMuiMenu } from "./helpers/hooks/useMuiMenu";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
}

function AccountArea() {
  const theme = useTheme();

  const { user, currentSpace, isLoggedIn, userInitials, logout } = useAuth();
  const { open, handleClick, anchorEl, handleClose } = useMuiMenu();

  const onLogout = () => {
    logout();
    handleClose();
  };

  const onSpaceClick = (space: Space) => {
    if (space.id !== currentSpace?.id) {
      console.log("space changed", space);
      // todo send space change request
    }
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
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1, mb: 1 }}>
          Spaces:
        </Typography>

        {user?.userspaces?.map((space) => (
          <MenuItem
            key={space.id}
            selected={space.id === currentSpace?.id}
            onClick={() => onSpaceClick(space)}
          >
            {space.name}
          </MenuItem>
        ))}

        <Divider />

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

function LogoGroup() {
  return (
    <>
      <LinkRouter to="/">
        <img src={Logo} width="40" height="40" alt="Logo" />
      </LinkRouter>

      <Typography
        component="a"
        variant="h6"
        noWrap
        sx={{
          ml: 2,
          mr: 2,
          color: "inherit",
          textDecoration: "none",
          fontWeight: 600,
          fontFamily: "monospace",
          letterSpacing: ".3rem",
        }}
      >
        BUBNOTION
      </Typography>
    </>
  );
}

function HamburgerMenu({ sections }: HeaderProps) {
  const navigate = useNavigate();

  const { open, handleClick, anchorEl, handleClose } = useMuiMenu();

  const onOptionClick = (url: string) => {
    navigate(url);
    handleClose();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={open}
        onClose={handleClose}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {sections.map((page) => (
          <MenuItem key={page.title} onClick={() => onOptionClick(page.url)}>
            <Typography textAlign="center">{page.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export function Header({ sections }: HeaderProps) {
  const theme = useTheme();

  return (
    <AppBar position="static" color="default" sx={{ paddingX: { xs: 1, md: 3 } }}>
      <Toolbar disableGutters sx={{ color: theme.palette.text.secondary }}>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <LogoGroup />
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <HamburgerMenu sections={sections} />
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1, alignItems: "center" }}>
          <LogoGroup />
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {sections.map((page) => (
            <LinkRouter
              key={page.title}
              to={page.url}
              style={{
                color: theme.palette.text.secondary,
                textDecoration: "none",
              }}
            >
              <Button key={page.title} sx={{ my: 2, color: "inherit", display: "block" }}>
                {page.title}
              </Button>
            </LinkRouter>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <AccountArea />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
