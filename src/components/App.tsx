import React, { FC } from 'react';
import Counter from "./Counter";
import "./App.css"

const App: FC = () => {
  return (
    <>
      <h1>Web UI Reference Application</h1>
      <p>Welcome to the Web UI Reference Application!</p>
      <Counter startNumber={10} />
    </>
  )
}

export default App;