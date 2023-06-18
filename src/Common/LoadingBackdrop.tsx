import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export function LoadingBackdrop() {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}