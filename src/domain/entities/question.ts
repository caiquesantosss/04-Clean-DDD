import { Slug } from './values-object/slug'
import { Entity } from '@/core/entities/entities'
import { UniqueEntityId } from '@/core/entities/unique-entity'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'

interface questionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<questionProps> {
  get AuthorId() {
    return this.props.authorId
  }

  get BestAnswerId() {
    return this.props.bestAnswerId
  }

  get Title() {
    return this.props.title
  }

  get Content() {
    return this.props.content
  }

  get Slug() {
    return this.props.slug
  }

  get CreatedAt() {
    return this.props.createdAt
  }

  get UpdateAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.CreatedAt, 'days') <= 3
  }

  get excerpt() {
    return this.Content.substring(0, 120).trim().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }


  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }


  static create(
    props: Optional<questionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id
    )

    return question
  }
}
