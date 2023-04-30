import EditIcon from "@mui/icons-material/Edit";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { Link } from "react-router-dom";
import type { Item } from "../../types";

interface Props {
  item: Item;
}

export function ItemTableRow({ item }: Props) {
  return (
    <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell>{item.author}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell align="right">{item.progress}</TableCell>
      <TableCell>
        <Link to={`/edit/${item.id}`}>
          <EditIcon color="primary" />
        </Link>
      </TableCell>
    </TableRow>
  );
}
