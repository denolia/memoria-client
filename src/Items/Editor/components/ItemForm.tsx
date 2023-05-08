import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { FormEvent } from "react";
import React from "react";
import { useNavigate } from "react-router";

import { useItems } from "../../state/ItemContext";
import { Priority, Status } from "../../types";
import type { Item } from "../../types";

interface Props {
  submitButtonText: string;
  pageTitle: string;
  currentItem?: Item;
}

export function ItemForm({ submitButtonText, currentItem, pageTitle }: Props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { updateItem } = useItems();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const title = data.get("title") as string | undefined;
    const description = data.get("description") as string | undefined;
    const priority = data.get("priority") as string | undefined;

    const newItem = {
      type: "Task",
      title,
      description,
      priority,
      status: Status.BACKLOG,
      id: currentItem?.id,
    } as Item;
    const res = await updateItem(newItem);

    if (res) {
      navigate("/");
    }
    // todo handle error case
  }

  return (
    <>
      <Typography variant="h4" gutterBottom marginLeft={theme.spacing(3)}>
        {pageTitle}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          defaultValue={currentItem?.title}
          autoFocus
        />
        <FormControl fullWidth>
          <InputLabel id="priority">Priority</InputLabel>
          <Select
            labelId="priority"
            id="priority"
            defaultValue={currentItem?.priority}
            label="Priority"
            name="priority"
          >
            <MenuItem value={Priority.LOW}>Low</MenuItem>
            <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
            <MenuItem value={Priority.HIGH}>High</MenuItem>
          </Select>
        </FormControl>

        <TextField
          margin="normal"
          fullWidth
          multiline
          rows={3}
          name="description"
          label="Description"
          id="description"
          defaultValue={currentItem?.description}
        />

        <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
          {submitButtonText}
        </Button>
      </Box>
    </>
  );
}
