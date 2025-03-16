import { UniqueEntityId } from '@/core/entities/unique-entity'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { Slug } from '../../enterprise/entities/values-object/slug'

interface GetQuestionBySlugUseCaseRequest {
    slug: string
}

interface GetQuestionBySlugUseCaseResponse {
    question: Question
}

export class GetQuestionBySlugUseCaseUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
        throw new Error('Question not found')
    }

    return {
        question
    }
  }
}
