import { Alert } from "@chakra-ui/react";
import React, { useState, useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputField = ({ todo, setTodo }: Props) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [taskEntered, setTaskEntered] = useState(false);
  const taskRef = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    taskRef.current !== ""
      ? setTaskEntered(true)
      : setTaskEntered(false);
    taskEntered
      ? setSuccessMsg("You have successfully added a task")
      : setErrorMsg("Task field is required.");
  };
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <p className="text-base">Please enter a task</p>
        {successMsg && (
          <Alert variant="top-accent">{successMsg}</Alert>
        )}
        {errorMsg && <Alert variant="subtle">{errorMsg}</Alert>}
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="task"
          ref={taskRef}
          type="input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter a task"
        />
        <button
          class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
          onClick={handleFormSubmit}
        >
          Go
        </button>
      </div>
    </form>
  );
};

export default InputField;
