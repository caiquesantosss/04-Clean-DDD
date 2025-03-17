import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { FetchQuestionAnswerUseCase } from './fetch-questions-answer-use-case'
import { MakeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswerUseCase

describe('Fetch Questions Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch a questions answers', async () => {
    await inMemoryAnswerRepository.create(
      MakeAnswer({
        questionId: new UniqueEntityId('question-1'),
      })
    )
    await inMemoryAnswerRepository.create(
      MakeAnswer({
        questionId: new UniqueEntityId('question-1'),
      })
    )
    await inMemoryAnswerRepository.create(
      MakeAnswer({
        questionId: new UniqueEntityId('question-1'),
      })
    )

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch pagineted a questions answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        MakeAnswer({
          questionId: new UniqueEntityId('question-1'),
        })
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
