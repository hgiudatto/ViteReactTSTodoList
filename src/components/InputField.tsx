import React, { useState } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputField = ({ todo, setTodo }: Props) => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="task"
          type="input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter a task"
        />
        <button
          class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Go
        </button>
      </div>
    </form>
  );
};

export default InputField;
