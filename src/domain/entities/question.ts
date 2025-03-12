import { Slug } from './values-object/slug'
import { Entity } from '../core/entities/entities'

interface questionProps {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question extends Entity<questionProps> {

}
