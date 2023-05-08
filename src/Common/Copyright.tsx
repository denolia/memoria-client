import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
      {...props}
    >
      Copyright ©
      <Link color="inherit" href="https://juliabubnova.com/">
        denolia
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
