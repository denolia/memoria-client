import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { FormEvent } from "react";
import React, { useRef } from "react";
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

  const datePickerRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const title = data.get("title") as string | undefined;
    const description = data.get("description") as string | undefined;
    const priority = data.get("priority") as string | undefined;

    const selectedDate = datePickerRef.current?.value;

    const newItem = {
      type: currentItem?.type ?? "Task",
      title,
      description,
      priority: priority ?? Priority.LOW,
      status: currentItem?.status ?? Status.BACKLOG,
      id: currentItem?.id,
      dueDate: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : undefined,
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
            name="priority"
            label="Priority"
            id="priority"
            defaultValue={currentItem?.priority ?? Priority.MEDIUM}
          >
            <MenuItem value={Priority.LOW}>Low</MenuItem>
            <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
            <MenuItem value={Priority.HIGH}>High</MenuItem>
          </Select>
        </FormControl>

        <DatePicker
          sx={{ mt: 1 }}
          label="Due Date"
          inputRef={datePickerRef}
          defaultValue={dayjs(currentItem?.dueDate)}
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

        <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
          {submitButtonText}
        </Button>
      </Box>
    </>
  );
}
