import { Answer } from '../../enterprise/entities/answer'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentUseCaseResponse {
  questionsComments: QuestionComment[]
}

export class FetchQuestionCommentUseCase {
  constructor(private questiosCommentRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentUseCaseRequest): Promise<FetchQuestionCommentUseCaseResponse> {
    const questionsComments = await this.questiosCommentRepository.findManyQuestionId(questionId, {
      page,
    })

    return { questionsComments }
  }
}
