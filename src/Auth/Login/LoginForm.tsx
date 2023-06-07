import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import type { FormEvent } from "react";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { Copyright } from "../../Common/Copyright";
import { useSnackbar } from "../../Common/Notifications/SnackbarContext";
import { useAuth } from "../AuthContext";
import { LoginMode } from "./types";

interface Props {
  mode: LoginMode;
}

export function LoginForm({ mode }: Props) {
  const { login, signup } = useAuth();
  const snackbar = useSnackbar();
  const [promoError, setPromoError] = React.useState(false);
  const theme = useTheme();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const email = data.get("email") as string | undefined;
    const password = data.get("password") as string | undefined;
    const promo = data.get("promo") as string | undefined;

    if (email && password) {
      if (mode === LoginMode.SIGN_UP) {
        if (!promo) {
          setPromoError(true);
          snackbar.showSnackbar("Please enter a promo code", "error");
          snackbar.showSnackbar("2", "error");
          snackbar.showSnackbar("3", "error");
          return;
        }
        signup(email, password, promo);
      } else {
        login(email, password);
      }
    }
  }

  return (
    <div className="container-sm justify-content-center col-lg-4 col-md-8 col-sm-12">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LockOutlinedIcon style={{ color: theme.palette.primary.light }} />

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {mode === LoginMode.SIGN_UP && (
              <TextField
                margin="normal"
                error={promoError}
                helperText={promoError && "Please enter a promo code"}
                required
                fullWidth
                id="promo"
                label="Promo Code"
                name="promo"
              />
            )}
            {/* <FormControlLabel */}
            {/*  control={<Checkbox value="remember" color="primary" />} */}
            {/*  label="Remember me" */}
            {/* /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              {mode}
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="/help" variant="body2"> */}
                {/*  Forgot password? */}
                {/* </Link> */}
              </Grid>
              <Grid item>
                <LinkRouter to={mode === LoginMode.SIGN_IN ? "/register" : "/login"}>
                  {mode === LoginMode.SIGN_IN
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign In"}
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Copyright />
      </Container>
    </div>
  );
}
