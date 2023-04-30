import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router";
import { useItems } from "../../state/ItemContext";
import type { Item } from "../../types";
import { ItemTableRow } from "./ItemTableRow";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export function TableView() {
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
      <Box sx={{ m: 3 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Progress</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: Item) => (
                <ItemTableRow item={item} key={item.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Fab color="success" aria-label="add" sx={fabStyle}>
        <AddIcon onClick={onAddItem} />
      </Fab>
    </>
  );
}
