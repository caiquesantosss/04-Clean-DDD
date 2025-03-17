import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface FetchQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswerUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answers = await this.answerRepository.findManyQuestionId(questionId, {
      page,
    })

    return {
      answers,
    }
  }
}
