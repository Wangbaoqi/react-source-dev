import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div name={count}>
      <p
        onClick={() => {
          // debugger;
          setCount(() => count + 1);
        }}
      >
        click p
      </p>
      <div title={count}>
        <span>{count}</span>
      </div>
    </div>
  );
}
