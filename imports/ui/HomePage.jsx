
import React, { useState } from 'react'
import { useCollection } from '../utils/useCollection'
import { Tasks } from '../api/tasks/collection'




export default function () {
  const [counter, setCounter] = useState(1)
  const [tasks, insertTask] = useCollection("tasks", Tasks)

  return (
    <div id="home">
      <p>
        local state counter: {counter}
        <button onClick={() => setCounter(counter + 1)}>increment</button>
      </p>
      <p>
        <button onClick={() => insertTask({ description: 'nuovo' })}>insert task</button>

        Some collection data:
      </p>
      {tasks.map(task => (
        <div key={task._id}>{task._id} - {task.description}</div>
      ))}
    </div>
  )
}