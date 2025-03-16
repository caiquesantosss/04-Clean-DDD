import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface EditAnswerRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.AuthorId.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return { answer }
  }
}
