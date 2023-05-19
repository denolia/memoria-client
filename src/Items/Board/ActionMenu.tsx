import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { useMuiMenu } from "../../helpers/hooks/useMuiMenu";
import { useItems } from "../state/ItemContext";
import { useItemDrawer } from "../state/ItemDrawerContext";
import type { Item } from "../types";

export function ActionMenu({ task }: { task: Item }) {
  const { open, anchorEl, handleClick, handleClose } = useMuiMenu();
  const { deleteItem } = useItems();
  const { setOpenDrawer } = useItemDrawer();
  const confirm = useConfirm();

  const onDelete = async () => {
    try {
      await confirm({ title: "Delete this task?", description: task.title });
      deleteItem(task.id);
    } catch {
      /* empty */
    }
  };

  const onEditItem = () => {
    setOpenDrawer(true, task);
    handleClose();
  };

  return (
    <div>
      <Button
        id="actions-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ minWidth: "20px" }}
      >
        <MoreVertIcon />
      </Button>

      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "actions-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={onEditItem}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <DeleteOutlineIcon />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
