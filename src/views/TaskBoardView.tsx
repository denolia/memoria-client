import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useMemo, useState } from "react";
import { LoginRequired } from "../Auth/Login/helpers/LoginRequired";
import { Board } from "../Items/Board/Board";
import { ItemDrawer } from "../Items/Drawer/ItemDrawer";
import { useItems } from "../Items/ItemContext";
import { ItemDrawerProvider } from "../Items/ItemDrawerContext";
import { ItemType, Status } from "../Items/types";

const defaultItem = {
  type: ItemType.TASK,
};

export function TaskBoardView() {
  const { epics } = useItems();

  const [epic, setEpic] = useState<{ label?: string; value: string } | null>(null);

  const epicsOptions = useMemo(
    () =>
      Object.values(epics)
        .filter((ep) => ep.status !== Status.DONE)
        .map((ep) => ({ label: ep.title, value: ep.id })),
    [epics]
  );

  return (
    <LoginRequired>
      <ItemDrawerProvider defaultItem={defaultItem}>
        <Autocomplete
          id="parent"
          value={epic}
          onChange={(_, newValue) => setEpic(newValue)}
          options={epicsOptions}
          sx={{ mx: { xs: 3, md: 6 }, mt: 2, width: "300px" }}
          renderInput={(params) => <TextField {...params} label="Epic" variant="standard" />}
        />

        <Board filterCriteria={{ type: { is: ItemType.TASK } }} epic={epic?.value} />

        <ItemDrawer />
      </ItemDrawerProvider>
    </LoginRequired>
  );
}
