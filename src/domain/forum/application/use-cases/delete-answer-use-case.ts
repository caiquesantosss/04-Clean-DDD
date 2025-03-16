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
        throw new Error('Answer not found')
    }

    if (authorId !== answer.AuthorId.toString()) {
        throw new Error('Not allowed')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}
