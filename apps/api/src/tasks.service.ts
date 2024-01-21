import { type TaskDTO } from 'core'
import * as fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

class TasksService {
  private tasks: TaskDTO[] = []

  constructor () {
    this.init()
  }

  async getTasks (): Promise<TaskDTO[]> {
    return this.tasks
  }

  async createTask (task: TaskDTO): Promise<TaskDTO> {
    const newTask = { ...task, id: Date.now() }
    this.tasks.push(newTask)
    await this.writeDbFile(this.tasks)
    return newTask
  }

  async deleteTask (taskId: string): Promise<TaskDTO[]> {
    const newTasks = this.tasks.filter((task) => task.id !== parseInt(taskId))
    this.tasks = newTasks
    await this.writeDbFile(this.tasks)
    return this.tasks
  }

  private async init () {
    this.tasks = await this.readDbFile()
  }

  private async readDbFile () {
    try {
      const data = await readFile('db.json', 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.log(error)
      // Si el archivo no existe, retorna un array vacío o estructura inicial
      return []
    }
  }

  private async writeDbFile (data: any) {
    await writeFile('db.json', JSON.stringify(data, null, 2), 'utf8')
  }
}

export const tasksService = new TasksService()
