import { Autocomplete, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { FormEvent } from "react";
import React, { useMemo, useRef, useState } from "react";

import { useItems } from "../state/ItemContext";
import { useItemDrawer } from "../state/ItemDrawerContext";
import type { Item } from "../types";
import { ItemType, Priority, Status } from "../types";

interface Props {
  actionText: string;
}

export function ItemForm({ actionText }: Props) {
  const { setOpenDrawer, editItem } = useItemDrawer();
  const theme = useTheme();
  const { updateItem, epics } = useItems();

  const [epic, setEpic] = useState(
    editItem.parent?.id
      ? { label: epics[editItem.parent.id].title, value: editItem.parent.id }
      : null
  );

  const epicsOptions = useMemo(
    () => Object.values(epics).map((ep) => ({ label: ep.title, value: ep.id })),
    [epics]
  );

  const datePickerRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const title = data.get("title") as string | undefined;
    const type = data.get("type") as ItemType | undefined;
    const description = data.get("description") as string | undefined;
    const priority = data.get("priority") as string | undefined;
    const status = data.get("status") as Status | undefined;
    const selectedDate = datePickerRef.current?.value;

    const mongoFriendlyDueDate = selectedDate
      ? dayjs(selectedDate).format("YYYY-MM-DD")
      : undefined;

    const newItem = {
      type: type ?? ItemType.TASK,
      parent: epic?.value ? { id: epic.value } : null,
      title,
      description,
      priority: priority ?? Priority.LOW,
      status: status ?? editItem?.status ?? Status.BACKLOG,
      id: editItem?.id,
      dueDate: mongoFriendlyDueDate,
    } as Item;

    const res = await updateItem(newItem);

    if (res) {
      setOpenDrawer(false);
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
          defaultValue={editItem?.title}
          autoFocus
        />

        <FormControl fullWidth>
          <InputLabel id="type">type</InputLabel>
          <Select
            labelId="type"
            name="type"
            label="type"
            id="type"
            defaultValue={editItem?.type ?? ItemType.TASK}
          >
            <MenuItem value={ItemType.TASK}>task</MenuItem>
            <MenuItem value={ItemType.EPIC}>epic</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          id="parent"
          value={epic}
          onChange={(_, newValue) => setEpic(newValue)}
          options={epicsOptions}
          sx={{ mt: 1 }}
          renderInput={(params) => <TextField {...params} label="Epic" />}
        />

        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel id="priority">priority</InputLabel>
          <Select
            labelId="priority"
            name="priority"
            label="priority"
            id="priority"
            defaultValue={editItem?.priority ?? Priority.MEDIUM}
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
            defaultValue={editItem?.status ?? Status.BACKLOG}
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
          defaultValue={editItem?.dueDate ? dayjs(editItem?.dueDate) : undefined}
        />

        <TextField
          margin="normal"
          fullWidth
          multiline
          rows={3}
          name="description"
          label="description"
          id="description"
          defaultValue={editItem?.description}
        />

        {editItem?.id && (
          <Typography variant="body2" color="grey.600">
            Created by: {editItem.creator?.name ?? "unknown"} on {editItem.created}
          </Typography>
        )}

        <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }}>
          {actionText}
        </Button>
      </Box>
    </>
  );
}
