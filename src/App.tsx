import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { Column } from "./Column";

// export function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <ItemsProvider>
//           <AppRoutes />
//         </ItemsProvider>
//       </BrowserRouter>
//     </div>
//   );
// }

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner", order: "" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialData;
  }

  onDragEnd = (result) => {
    console.log("onDragEnd", result);
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);

          return <Column key={columnId} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}
