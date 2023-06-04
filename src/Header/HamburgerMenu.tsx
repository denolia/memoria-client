import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router";
import { useMuiMenu } from "../helpers/hooks/useMuiMenu";
import type { HeaderProps } from "./types";

export function HamburgerMenu({ sections }: HeaderProps) {
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
