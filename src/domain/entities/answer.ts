import { Entity } from '../core/entities/entities'

interface answerProps {
  authorId: string
  questionId: string
  content: string
}

export class Answer extends Entity<answerProps> {
  get content() {
    return this.props.content
  }
}
