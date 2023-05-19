import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { LoginRequired } from "../../Auth/Login/helpers/LoginRequired";
import { ItemForm } from "../Editor/components/ItemForm";

import { useItems } from "../state/ItemContext";
import { Board } from "./Board";
import { ItemDrawerProvider, useItemDrawer } from "../state/ItemDrawerContext";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

function EditTaskDrawer() {
  const { openDrawer, setOpenDrawer } = useItemDrawer();
  return (
    <>
      <Button onClick={() => setOpenDrawer(true)}>Open</Button>

      <Drawer anchor="right" hideBackdrop open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <ItemForm submitButtonText="Create Item" pageTitle="Create New Item" />
      </Drawer>
    </>
  );
}

function CreateItemFab() {
  const { setOpenDrawer, setEditItem } = useItemDrawer();

  const onAddItem = () => {
    setEditItem(null);
    setOpenDrawer(true);
  };

  return (
    <Fab color="success" aria-label="add" sx={fabStyle}>
      <AddIcon onClick={onAddItem} />
    </Fab>
  );
}

export function BoardView() {
  const { items } = useItems();

  const theme = useTheme();

  return (
    <LoginRequired>
      <ItemDrawerProvider>
        <Typography variant="h4" gutterBottom marginLeft={theme.spacing(3)}>
          My items
        </Typography>
        {Object.keys(items)?.length > 0 && (
          <Box sx={{ m: 3 }}>
            <Board />
          </Box>
        )}

        <EditTaskDrawer />

        <CreateItemFab />
      </ItemDrawerProvider>
    </LoginRequired>
  );
}
