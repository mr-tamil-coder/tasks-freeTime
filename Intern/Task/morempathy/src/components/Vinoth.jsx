import React, { useState, useEffect } from "react";

const Vinoth = () => {
  const [count, setCount] = useState(0);
  const [texts, setTexts] = useState("");

   useEffect(() => {
   const timer1=  setTimeout(() => {
      console.log("⏱ logging after 2 seconds");
    }, 2000);

    const timer2= setTimeout(() => {
      console.log("⏱ logging after 4 seconds");
    }, 4000);

    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
    }
  },[]);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <h1>{count}</h1>

      <input
        type="text"
        value={texts}
        onChange={(e) => setTexts(e.target.value)}
      />
    </div>
  );
};

export default Vinoth;
