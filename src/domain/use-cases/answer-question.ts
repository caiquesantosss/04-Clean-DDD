import { UniqueEntityId } from '@/core/entities/unique-entity'
import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface AnswerQuestionRequest {
  authorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
    constructor (
        private answerRepository: AnswerRepository 
    ) {}

  async execute({ authorId, questionId, content }: AnswerQuestionRequest) {
    const answer = Answer.create({
        content, 
        authorId: new UniqueEntityId(authorId), 
        questionId: new UniqueEntityId(questionId)   
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
