import React from "react";
import styled from "styled-components";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

export class Column extends React.Component<{ tasks: any; column: any }> {
  render() {
    const { tasks, column } = this.props;
    return (
      <Container>
        <Title>{column.title}</Title>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <TaskList {...provided.droppableProps} ref={provided.innerRef}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        {/* <Droppable droppableId={column.id}> */}
        {/*  {(provided) => ( */}
        {/*    <div innerRef={provided.innerRef} {...provided.droppableProps}> */}
        {/*      {tasks.map((task, index) => ( */}
        {/*        <Task task={task} index={index} /> */}
        {/*      ))} */}
        {/*      {provided.placeholder} */}
        {/*    </div> */}
        {/*  )} */}
        {/* </Droppable> */}
      </Container>
    );
  }
}
