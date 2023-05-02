import React, { ChangeEvent, useState, useEffect } from "react";
import { Task } from "../types/types";
import TodoTask from "./TodoTask";

type Props = {};

const Todo = (props: Props) => {
  const [task, setTask] = useState<string>("");
  const [deadLine, setDeadLine] = useState<number>(0);
  const [todoList, setTodoList] = useState<Task[]>([]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadLine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadLine: deadLine };
    setTodoList([...todoList, newTask]);
    console.log(todoList);
    setTask("");
    setDeadLine(0);
  };

  return (
    <>
      <div className="md:container md:mx-auto bg-orange-600">
        <input
          type="text"
          className="shadow-sm border-gray-300 rounded-lg m-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          placeholder="Enter some task..."
          name="task"
          value={task}
          onChange={handleChange}
        />
        <input
          type="number"
          className="shadow-sm border-gray-300 rounded-lg m-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          placeholder="Deadline (in Days)..."
          name="deadline"
          value={deadLine}
          onChange={handleChange}
        />
        <button
          type="button"
          className="m-2 px-8 py-2 bg-indigo-500 text-white rounded-lg shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-200"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="md:container md:mx-auto bg-sky-700">
        {todoList.map((task: Task, key: number) => {
          return <TodoTask key={key} task={task} />;
        })}
      </div>
    </>
  );
};

export default Todo;
