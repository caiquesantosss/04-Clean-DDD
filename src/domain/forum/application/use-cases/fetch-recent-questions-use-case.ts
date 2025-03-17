import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { Slug } from '../../enterprise/entities/values-object/slug'

interface FetchRecentQuestionUseCaseRequest {
    page: number
}

interface FetchRecentQuestionUseCaseResponse {
    questions: Question[]
}

export class FetchRecentQuestionUseCaseUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return {
        questions, 
    }
  }
}
