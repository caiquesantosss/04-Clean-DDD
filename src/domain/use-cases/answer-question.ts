import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface AnswerQuestionRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
    constructor (
        private answerRepository: AnswerRepository 
    ) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const answer = new Answer({
        content, 
        authorId: instructorId, 
        questionId
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
