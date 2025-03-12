import { randomUUID } from 'node:crypto'
import { Slug } from './values-object/slug'

interface questionProps {
    title: string
    content: string
    slug: Slug
    authorId: string
}

export class Question {
  public id: string
  public title: string
  public content: string
  public slug: Slug
  public authorId: string

  constructor(props: questionProps, id?: string) {
      this.title = props.title
      this.content = props.content
      this.slug = props.slug
      this.authorId = props.authorId
      this.id = id ?? randomUUID()
    }
}
