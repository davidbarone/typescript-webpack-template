import React, { FunctionComponent } from 'react';
const { useState, useEffect } = React;

interface CounterProps {
  startNumber: number;
}

const Counter: FunctionComponent<CounterProps> = ({ startNumber }) => {
  const [value, setValue] = useState(0);

  useEffect(() => { setValue(startNumber) }, []);

  return (
    <>
      <div>Counter: {value}</div>
      <button onClick={() => setValue((value) => value + 1)}>Increment</button>
      <button onClick={() => setValue((value) => value - 1)}>Decrement</button>
    </>
  )
}

export default Counter;