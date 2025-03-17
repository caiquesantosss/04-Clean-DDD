import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository"
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-coments-repository'
import { CommentOnAnswerUseCase } from "./comment-on-answer-use-case"
import { MakeAnswer } from "test/factories/make-answer"


let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentRepository
    )
  })

  it('should be able to comment on question', async () => {
    const answer = MakeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.AuthorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'Comentario teste'
    )
  })
})
