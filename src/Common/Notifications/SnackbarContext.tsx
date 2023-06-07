import type { AlertProps } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react";

interface SnackbarsContext {
  showSnackbar: (message: string, type: SnackbarType) => void;
}

const Context = React.createContext<SnackbarsContext | undefined>(undefined);

type SnackbarType = AlertProps["severity"];

interface SnackData {
  open: boolean;
  message: string;
  type: SnackbarType;
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snacks, setSnacks] = useState<SnackData[]>([]);

  const showSnackbar = useCallback((msg: string, typ: SnackbarType) => {
    // todo: add a queue of snackbars
    setSnacks(snacks.concat({ open: true, message: msg, type: typ }));
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
