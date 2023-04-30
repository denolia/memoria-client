import * as React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import type { OnDragEndResponder } from "react-beautiful-dnd";
import { Item } from "../Items/types";
import DraggableListItem from "./DraggableListItem";

export type DraggableListProps = {
  items: Item[];
  onDragEnd: OnDragEndResponder;
};

// copied from https://codesandbox.io/s/draggable-material-ui-oj3wz

const DraggableList = React.memo(({ items, onDragEnd }: DraggableListProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable-list">
      {(provided) => (
        // eslint-disable-next-line
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items.map((item, index) => (
            <DraggableListItem item={item} index={index} key={item.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
));

export default DraggableList;
