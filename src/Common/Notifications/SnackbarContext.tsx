import type { AlertProps } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react";

interface SnackbarsContext {
  showSnackbar: (message: string, type: SnackbarType) => void;
}

const Context = React.createContext<SnackbarsContext | undefined>(undefined);

type SnackbarType = AlertProps["severity"];

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<SnackbarType>();

  const showSnackbar = useCallback((msg: string, typ: SnackbarType) => {
    setOpen(true);
    setMessage(msg);
    setType(typ);
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const value = { showSnackbar };

  return (
    <Context.Provider value={value}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Context.Provider>
  );
}

export function useSnackbar() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
}
