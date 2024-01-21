import { type TaskDTO } from './TaskDTO'

export class Task {
  id: number
  text: string

  constructor (id: number, text: string) {
    this.id = id
    this.text = text
  }

  public toTaskDTO (): TaskDTO {
    return {
      id: this.id,
      text: this.text
    }
  }
}
