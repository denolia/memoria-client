import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import Logo from "../assets/lighthouse.svg";
import { AccountArea } from "./AccountArea";
import { HamburgerMenu } from "./HamburgerMenu";
import type { HeaderProps } from "./types";

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
