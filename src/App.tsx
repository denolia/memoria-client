import { ConfirmProvider } from "material-ui-confirm";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "./Auth/AuthContext";
import { ItemsProvider } from "./Items/state/ItemContext";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ItemsProvider>
            <ConfirmProvider>
              <AppRoutes />
            </ConfirmProvider>
          </ItemsProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
