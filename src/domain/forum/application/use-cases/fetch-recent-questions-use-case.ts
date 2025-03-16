import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { Slug } from '../../enterprise/entities/values-object/slug'

interface FetchRecentQuestionUseCaseRequest {
    page: number
}

interface FetchRecentQuestionUseCaseResponse {
    question: Question[]
}

export class FetchRecentQuestionUseCaseUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
        throw new Error('Question not found')
    }

    return {
        question
    }
  }
}
