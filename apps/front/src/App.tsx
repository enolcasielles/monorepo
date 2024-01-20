import { type Task } from 'core'
import { useEffect, useState } from 'react'
import { createTask, deleteTask, getTasks } from './services/tasks.service'

export default function App () {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = async () => {
    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false
    }
    const createdTask = await createTask(task)
    setTasks([...tasks, createdTask])
    setNewTask('')
  }

  const onDeleteTask = async (id: number) => {
    const tasks = await deleteTask(id.toString())
    setTasks(tasks)
  }

  useEffect(() => {
    const f = async () => {
      const _tasks = await getTasks()
      setTasks(_tasks)
    }
    f()
  }, [])

  return (
    <div className='tasks'>
      <div className='newTask'>
        <input
          type="text"
          value={newTask}
          onChange={(e) => { setNewTask(e.target.value) }}
        />
        <button disabled={newTask === ''} onClick={() => {
          addTask()
        }}>Añadir</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} >
            {task.text}
            <button onClick={() => { onDeleteTask(task.id) }}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
