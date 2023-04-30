import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { FormEvent } from "react";
import React from "react";
import { useNavigate } from "react-router";

import { useItems } from "../../state/ItemContext";
import type { Item } from "../../types";

interface Props {
  submitButtonText: string;
  title: string;
  currentItem?: Item;
}

export function ItemForm({ submitButtonText, currentItem, title }: Props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { updateItem } = useItems();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const description = data.get("description") as string | undefined;
    const author = data.get("author") as string | undefined;
    const progress = Number((data.get("progress") as string | undefined) ?? "0");
    const name = data.get("name") as string | undefined;

    const newItem = {
      description,
      author,
      progress,
      name,
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
        {title}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Title"
          name="name"
          defaultValue={currentItem?.name}
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="author"
          label="Author"
          id="author"
          defaultValue={currentItem?.author}
        />

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

        <TextField
          type="number"
          inputProps={{ min: 0, max: 100 }}
          name="progress"
          label="Progress"
          id="progress"
          defaultValue={currentItem?.progress}
        />

        <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
          {submitButtonText}
        </Button>
      </Box>
    </>
  );
}
