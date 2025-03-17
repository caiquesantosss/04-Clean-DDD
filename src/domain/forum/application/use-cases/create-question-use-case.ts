import { UniqueEntityId } from '@/core/entities/unique-entity'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface CreateQuestionRequest {
    authorId: string
    title: string
    content: string
}

interface CreateQuestionResponse {
    question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId, 
    title,
    content
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = Question.create({
        authorId: new UniqueEntityId(authorId),
        title,
        content
    })

    await this.questionRepository.create(question)

    return { question }
  }
}
