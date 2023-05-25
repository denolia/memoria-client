import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useMemo, useState } from "react";
import { LoginRequired } from "../Auth/Login/helpers/LoginRequired";
import { Board } from "../Items/Board/Board";
import { ItemDrawer } from "../Items/Drawer/ItemDrawer";
import { useItems } from "../Items/state/ItemContext";
import { ItemDrawerProvider } from "../Items/state/ItemDrawerContext";
import { ItemType } from "../Items/types";

const defaultItem = {
  type: ItemType.TASK,
};

export function TaskBoardView() {
  const { epics } = useItems();

  const [epic, setEpic] = useState<{ label?: string; value: string } | null>(null);

  const epicsOptions = useMemo(
    () => Object.values(epics).map((ep) => ({ label: ep.title, value: ep.id })),
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
          sx={{ mx: { xs: 0, md: 3 }, width: "150px" }}
          renderInput={(params) => <TextField {...params} label="Epic" />}
        />

        <Board filter={(item) => item.type === ItemType.TASK} epic={epic?.value} />

        <ItemDrawer />
      </ItemDrawerProvider>
    </LoginRequired>
  );
}
