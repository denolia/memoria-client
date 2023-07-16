import { ConfirmProvider } from "material-ui-confirm";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "./Auth/AuthContext";
import { SnackbarProvider } from "./Common/Notifications/SnackbarContext";
import { ItemsProvider } from "./Items/ItemContext";

export function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <AuthProvider>
          <ItemsProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ConfirmProvider>
                <AppRoutes />
              </ConfirmProvider>
            </LocalizationProvider>
          </ItemsProvider>
        </AuthProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
