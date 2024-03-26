import React, { useState, useCallback, useMemo } from "react";

const CounterCallback = () => {
  const [count, setCount] = useState(0);

  const double = () => {
    return count * 2;
  };

  const callback = useCallback(double, [count]);
  const memo = useMemo(double, []);

  console.log(`callback: `, callback);
  console.log(callback());

  console.log(memo);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>INCREMENT</button>
      <p>{count}</p>
    </div>
  );
};

export default CounterCallback;
