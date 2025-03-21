import { PaginationParams } from '@/core/repositories/pagenations-params'
import { AnswerRepository } from '../../src/domain/forum/application/repositories/answer-repository'
import { Answer } from '../../src/domain/forum/enterprise/entities/answer'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []
  static items: any

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentRepository
  ) {}

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }
    return answer
  }

  async findManyQuestionId(questioId: string, params: PaginationParams) {
    const answers = this.items
      .filter((item) => item.QuestionId.toString() === questioId)
      .slice((params.page - 1) * 20, params.page * 20)

    return answers
  }
}
