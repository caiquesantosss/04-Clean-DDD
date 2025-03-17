import { UniqueEntityId } from '@/core/entities/unique-entity'
import { QuestionRepository } from '../repositories/question-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface CommentOnQuestionRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return { questionComment }
  }
}
