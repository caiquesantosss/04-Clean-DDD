import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface DeleteAnswerCommentRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId
    )

    if (!answerComment) {
      throw new Error('Question not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answerCommentRepository.delete(answerComment)

    return {}
  }
}
