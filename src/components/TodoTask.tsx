import React from "react";
import { Task } from "../types/types";

type Props = {
  task: Task;
  completeTask(taskName2Del: string): void;
};

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <>
      <div className="md:container md:mx-auto bg-sky-700">
        <span>{task.taskName}</span>
        <span>{task.deadline}</span>
      </div>
      <button
        onClick={() => {
          completeTask(task.taskName);
        }}
      >
        X
      </button>
    </>
  );
};

export default TodoTask;
