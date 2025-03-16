import { QuestionRepository } from '../repositories/question-repository'

interface DeleteQuestionRequest {
    authorId: string
    questionId: string
}

interface DeleteQuestionResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}


  async execute({
    authorId,
    questionId,
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
        throw new Error('Question not found')
    }

    if (authorId !== question.AuthorId.toString()) {
        throw new Error('Not allowed')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
