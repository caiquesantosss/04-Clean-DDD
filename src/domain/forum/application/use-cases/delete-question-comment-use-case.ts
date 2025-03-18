import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId
    )

    if (!questionComment) {
      throw new Error('Question not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionCommentRepository.delete(questionComment)

    return {}
  }
}
