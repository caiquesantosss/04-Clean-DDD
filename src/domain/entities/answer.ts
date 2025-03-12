import { randomUUID } from 'node:crypto'

interface answerProps {
  authorId: string
  questionId: string
  content: string
}

export class Answer {
  public id: string
  public content: string
  public authorId: string
  public questionId: string

  constructor(props: answerProps, id?: string) {
    this.authorId = props.authorId
    this.questionId = props.questionId
    this.content = props.content
    this.id = id ?? randomUUID()
  }
}
