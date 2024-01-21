import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { tasksService } from './tasks.service'
import { type TaskDTO } from 'core'

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 3001

app.get('/tasks/', async (_, res) => {
  const tasks = await tasksService.getTasks()
  res.json(tasks)
})

app.post('/tasks/', async (req, res) => {
  console.log(req.body)
  const createdTask = await tasksService.createTask(req.body as TaskDTO)
  res.json(createdTask)
})

app.delete('/tasks/:taskId', async (req, res) => {
  const newTasks = await tasksService.deleteTask(req.params.taskId)
  res.json(newTasks)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
