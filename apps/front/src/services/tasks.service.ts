import { type Task } from 'core'

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch('http://localhost:3001/tasks')
  return await response.json()
}

export const createTask = async (task: Task): Promise<Task> => {
  const response = await fetch('http://localhost:3001/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export const deleteTask = async (taskId: string): Promise<Task[]> => {
  const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}
