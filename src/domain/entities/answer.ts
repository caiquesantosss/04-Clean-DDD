import { Entity } from '@/core/entities/entities'
import { UniqueEntityId } from '@/core/entities/unique-entity'
import { Optional } from '@/core/types/optional'

interface answerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<answerProps> {
  get AuthorId() {
    return this.props.authorId
  }

  get QuestionId() {
    return this.props.questionId
  }

  get Content() {
    return this.props.content
  }

  get CreatedAt() {
    return this.props.createdAt
  }

  get UpdateAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.Content.substring(0, 120).trim().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }


  static create(
    props: Optional<answerProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    )

    return answer
  }
}
