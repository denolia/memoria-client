import InboxIcon from "@mui/icons-material/Inbox";
import { Avatar } from "@mui/material";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import type { Item } from "../Items/types";

export type DraggableListItemProps = {
  item: Item;
  index: number;
};

function DraggableListItem({ item, index }: DraggableListItemProps) {
  return (
    <Draggable draggableId={item.id!} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? "" : ""}
        >
          <ListItemAvatar>
            <Avatar>
              <InboxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.title} secondary={item.name} />
        </ListItem>
      )}
    </Draggable>
  );
}

export default DraggableListItem;
