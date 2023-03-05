import React from "react"
import { Button, message } from "antd"
import "antd/dist/reset.css"
import "./App.css"

function App() {
  return (
    <div className='App'>
      <h1>React + Ant Design + TypeScript</h1>
      <Button onClick={() => message.info("Hello Word")}>Hello World</Button>
    </div>
  )
}

export default App
