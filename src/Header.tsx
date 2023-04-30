import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { Link as LinkRouter } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Logo from "./assets/lighthouse.svg";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export function Header({ sections, title }: HeaderProps) {
  const theme = useTheme();

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <LinkRouter to="/">
          <img src={Logo} width="30" height="30" alt="Logo" />
        </LinkRouter>

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
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
