import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { ItemsProvider } from "./Items/state/ItemContext";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <ItemsProvider>
          <AppRoutes />
        </ItemsProvider>
      </BrowserRouter>
    </div>
  );
}
