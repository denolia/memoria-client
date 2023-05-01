import AddIcon from "@mui/icons-material/Add";
// import { Stack } from "@mui/material";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router";

import { useItems } from "../../state/ItemContext";
import { Board } from "./Board";
// import type { Item } from "../../types";
// import { ItemTableRow } from "./ItemTableRow";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export function TableView() {
  const { items } = useItems();
  console.log(items);

  const theme = useTheme();
  const navigate = useNavigate();

  const onAddItem = () => {
    navigate("/create");
  };

  return (
    <>
      <Typography variant="h4" gutterBottom marginLeft={theme.spacing(3)}>
        My items
      </Typography>
      <Paper>
        <Board fetchedItems={items} />
      </Paper>

      <Fab color="success" aria-label="add" sx={fabStyle}>
        <AddIcon onClick={onAddItem} />
      </Fab>
    </>
  );
}
