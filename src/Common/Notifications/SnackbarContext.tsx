import type { AlertProps } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface SnackbarsContext {
  showSnackbar: (message: string, type: SnackbarType) => void;
}

const Context = React.createContext<SnackbarsContext | undefined>(undefined);

type SnackbarType = AlertProps["severity"];

interface SnackData {
  id: string;
  open: boolean;
  message: string;
  type: SnackbarType;
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snacks, setSnacks] = useState<SnackData[]>([]);

  const showSnackbar = useCallback((msg: string, typ: SnackbarType) => {
    setSnacks((existingSnacks) => [
      ...existingSnacks,
      { open: true, message: msg, type: typ, id: uuidv4() },
    ]);
  }, []);

  const handleClose = (snackId: SnackData["id"], reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnacks((existingSnacks) => existingSnacks.filter((snack) => snack.id !== snackId));
  };

  const value = { showSnackbar };

  return (
    <Context.Provider value={value}>
      {children}
      {snacks.map((snack) => (
        <Snackbar
          key={snack.id}
          open={snack.open}
          autoHideDuration={6000}
          onClose={(_, reason) => handleClose(snack.id, reason)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={() => handleClose(snack.id)} severity={snack.type} sx={{ width: "100%" }}>
            {snack.message}
          </Alert>
        </Snackbar>
      ))}
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
