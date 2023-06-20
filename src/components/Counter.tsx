import React from "react";
import { useState, useEffect } from "react";

type Props = {};

const Counter = (props: Props) => {
  const [val, setVal] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVal((v) => v + 1);
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return <div>{val}</div>;
};

export default Counter;
