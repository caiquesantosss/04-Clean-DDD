import { left, right } from '@/core/either'
import { AnswerRepository } from '../repositories/answer-repository'

interface DeleteAnswerRequest {
    authorId: string
    answerId: string
}

interface DeleteAnswerResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}


  async execute({
    authorId,
    answerId,
  }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
        return left('Answer not found')
    }

    if (authorId !== answer.AuthorId.toString()) {
        return left('Not Allowed')
    }

    await this.answerRepository.delete(answer)

    return right({})
  }
}
