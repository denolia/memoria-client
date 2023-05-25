import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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

export function Header2({ sections }: HeaderProps) {
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

const settings = ["Profile", "Account", "Dashboard", "Logout"];

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

export function Header({ sections }: HeaderProps) {
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="default" sx={{ paddingX: { xs: 1, md: 3 } }}>
      <Toolbar disableGutters sx={{ color: theme.palette.text.secondary }}>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <LogoGroup />
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {sections.map((page) => (
              <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
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
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                {page.title}
              </Button>
            </LinkRouter>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
