import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import type { Item } from "../../types";

interface Props {
  item: Item;
}

export function ItemTableRow({ item }: Props) {
  console.log(item);
  return (
    <Paper key={item.id} elevation={2}>
      {item.title}
    </Paper>
    // <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    //   <TableCell component="th" scope="row">
    //     {item.name}
    //   </TableCell>
    //   <TableCell>{item.author}</TableCell>
    //   <TableCell>{item.description}</TableCell>
    //   <TableCell align="right">{item.progress}</TableCell>
    //   <TableCell>
    //     <Link to={`/edit/${item.id}`}>
    //       <EditIcon color="primary" />
    //     </Link>
    //   </TableCell>
    // </TableRow>
  );
}
