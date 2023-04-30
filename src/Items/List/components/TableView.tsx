import AddIcon from "@mui/icons-material/Add";
// import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import type { DropResult } from "react-beautiful-dnd";
import DraggableList from "../../../DragDrop/DraggableList";
import { reorder } from "../../../helpers/helpers";
import { useItems } from "../../state/ItemContext";
// import type { Item } from "../../types";
// import { ItemTableRow } from "./ItemTableRow";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export function TableView() {
  const { items: fetchedItems } = useItems();
  const [items, setItems] = useState(fetchedItems);
  const theme = useTheme();
  const navigate = useNavigate();

  const onAddItem = () => {
    navigate("/create");
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom marginLeft={theme.spacing(3)}>
        My items
      </Typography>
      <Paper>
        <DraggableList items={items} onDragEnd={onDragEnd} />
      </Paper>
      <Box sx={{ m: 3 }}>
        {/* <Stack spacing={2}> */}
        {/*   {items.map((item: Item) => ( */}
        {/*     <ItemTableRow item={item} key={item.id} /> */}
        {/*   ))} */}
        {/* </Stack> */}

        {/* <TableContainer component={Paper}> */}
        {/*  <Table aria-label="simple table"> */}
        {/*    <TableHead> */}
        {/*      <TableRow> */}
        {/*        <TableCell>Title</TableCell> */}
        {/*        <TableCell>Author</TableCell> */}
        {/*        <TableCell>Description</TableCell> */}
        {/*        <TableCell align="right">Progress</TableCell> */}
        {/*        <TableCell> </TableCell> */}
        {/*      </TableRow> */}
        {/*    </TableHead> */}
        {/*    <TableBody> */}
        {/*      */}
        {/*    </TableBody> */}
        {/*  </Table> */}
        {/* </TableContainer> */}
      </Box>

      <Fab color="success" aria-label="add" sx={fabStyle}>
        <AddIcon onClick={onAddItem} />
      </Fab>
    </>
  );
}
