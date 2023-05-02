import React from "react";
import { Task } from "../types/types";

type Props = {
  task: Task;
};

const TodoTask = ({ task }: Props) => {
  return (
    <div>
      {task.taskName} {task.deadline}
    </div>
  );
};

export default TodoTask;
