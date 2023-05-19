import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { FormEvent } from "react";
import React, { useRef, useState } from "react";

import { useItems } from "../state/ItemContext";
import { useItemDrawer } from "../state/ItemDrawerContext";
import type { Item } from "../types";
import { Priority, Status } from "../types";

interface Props {
  actionText: string;
  currentItem: Partial<Item>;
}

export function ItemForm({ actionText, currentItem }: Props) {
  const { setOpenDrawer } = useItemDrawer();
  const [item] = useState<Partial<Item>>(currentItem);
  const theme = useTheme();
  console.log("item", item);

  const { updateItem } = useItems();
  const datePickerRef = useRef<HTMLInputElement | null>(null);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const title = data.get("title") as string | undefined;
    const description = data.get("description") as string | undefined;
    const priority = data.get("priority") as string | undefined;

    const selectedDate = datePickerRef.current?.value;

    const mongoFriendlyDueDate = selectedDate
      ? dayjs(selectedDate).format("YYYY-MM-DD")
      : undefined;

    const newItem = {
      type: item?.type ?? "Task",
      title,
      description,
      priority: priority ?? Priority.LOW,
      status: item?.status ?? Status.BACKLOG,
      id: item?.id,
      dueDate: mongoFriendlyDueDate,
    } as Item;

    const res = await updateItem(newItem);

    if (res) {
      setOpenDrawer(false, {});
    }
    // todo handle error case
  }

  return (
    <>
      <Typography variant="h4" gutterBottom marginLeft={theme.spacing(3)}>
        {actionText}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="title"
          name="title"
          defaultValue={item?.title}
          autoFocus
        />
        <FormControl fullWidth>
          <InputLabel id="priority">priority</InputLabel>
          <Select
            labelId="priority"
            name="priority"
            label="priority"
            id="priority"
            defaultValue={item?.priority ?? Priority.MEDIUM}
          >
            <MenuItem value={Priority.LOW}>low</MenuItem>
            <MenuItem value={Priority.MEDIUM}>medium</MenuItem>
            <MenuItem value={Priority.HIGH}>high</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel id="status">status</InputLabel>
          <Select
            labelId="status"
            name="status"
            label="status"
            id="status"
            defaultValue={item?.status ?? Status.BACKLOG}
          >
            <MenuItem value={Status.BACKLOG}>backlog</MenuItem>
            <MenuItem value={Status.TODO}>todo</MenuItem>
            <MenuItem value={Status.IN_PROGRESS}>in progress</MenuItem>
            <MenuItem value={Status.DONE}>done</MenuItem>
          </Select>
        </FormControl>

        <DatePicker
          sx={{ mt: 1 }}
          label="due date"
          inputRef={datePickerRef}
          defaultValue={item?.dueDate ? dayjs(item?.dueDate) : undefined}
        />

        <TextField
          margin="normal"
          fullWidth
          multiline
          rows={3}
          name="description"
          label="description"
          id="description"
          defaultValue={item?.description}
        />

        <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
          {actionText}
        </Button>
      </Box>
    </>
  );
}
