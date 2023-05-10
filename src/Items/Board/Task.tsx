import { Draggable } from "@hello-pangea/dnd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createTheme, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { useNavigate } from "react-router";
import { useItems } from "../state/ItemContext";
import type { Item } from "../types";

const darkTheme = createTheme({ palette: { mode: "dark" } });

interface Props {
  order: number;
  taskId: Item["id"];
}

export function ActionMenu({ task }: { task: Item }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const { deleteItem } = useItems();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onDelete = async () => {
    try {
      await confirm({ title: "Delete this task?", description: task.title });
      deleteItem(task.id);
    } catch {
      /* empty */
    }
  };

  const onEditItem = () => {
    navigate(`/edit/${task.id}`);
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
            <EditIcon onClick={onEditItem} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteOutlineIcon onClick={onDelete} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default function Task({ order, taskId }: Props) {
  const { items } = useItems();

  const task = items[taskId];

  return task ? (
    <Draggable draggableId={taskId} index={order}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper
            sx={{
              padding: 1,
              backgroundColor: snapshot.isDragging ? darkTheme.palette.primary.light : "white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>{task?.title}</Typography>
            <ActionMenu task={task} />
          </Paper>
        </div>
      )}
    </Draggable>
  ) : null;
}
