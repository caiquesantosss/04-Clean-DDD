import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface EditQuestionRequest {
    authorId: string
    questionId: string
    title: string, 
    content: string
}

interface EditQuestionResponse {
    question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}


  async execute({
    authorId,
    questionId,
    title,
    content
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.AuthorId.toString()) {
      throw new Error('Not allowed')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return { question }
  }
}
