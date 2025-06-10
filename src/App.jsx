import { useState } from 'react'
import './App.css'
import { Task } from './components/Task'
import { MantineProvider } from '@mantine/core'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MantineProvider>
      <Task description={"dummy desc"} id={1} status={"in progress"} title={"basic task"} key={1}></Task>

    </MantineProvider>
    </>
  )
}

export default App
