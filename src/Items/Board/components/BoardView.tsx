import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router";

import { useItems } from "../../state/ItemContext";
import { Board } from "./Board";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export function BoardView() {
  const { items } = useItems();

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
      {items.length > 0 && (
        <Box sx={{ m: 3 }}>
          <Board fetchedItems={items} />
        </Box>
      )}
      <Fab color="success" aria-label="add" sx={fabStyle}>
        <AddIcon onClick={onAddItem} />
      </Fab>
    </>
  );
}
