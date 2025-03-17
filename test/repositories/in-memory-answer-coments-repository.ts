import { AnswerCommentRepository } from '../../src/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '../../src/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = []

  async create(questionComment: AnswerComment) {
    this.items.push(questionComment)
  }
}
