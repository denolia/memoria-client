import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

export function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
      Copyright ©
      <Link color="inherit" href="https://juliabubnova.com/">
        denolia
      </Link>
      &
      <Link color="inherit" href="https://demoth.com/">
        demoth
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
