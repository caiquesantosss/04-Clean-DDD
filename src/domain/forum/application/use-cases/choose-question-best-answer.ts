import { UniqueEntityId } from '@/core/entities/unique-entity'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface ChooseQuestionBestAnswerRequest {
  AnswerId: string
  AuthorId: string
}

interface ChooseQuestionBestAnswerResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository
  ) {}

  async execute({
    AnswerId,
    AuthorId,
  }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answerRepository.findById(AnswerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionRepository.findById(
      answer.QuestionId.toString()
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (AuthorId !== question.AuthorId.toString()) {
      throw new Error('Not allowed')
    }
    
    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
        question
    }
  }
}
