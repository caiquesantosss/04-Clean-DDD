import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { MakeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionUseCaseUseCase } from './fetch-recent-questions-use-case'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionUseCaseUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionUseCaseUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch a recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 20) })
    )
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 18) })
    )
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 23) })
    )

    const { questions } = await sut.execute({
      page: 1
    })

    expect(questions).toEqual([
      expect.objectContaining({ CreatedAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ CreatedAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ CreatedAt: new Date(2022, 0, 18) })
    ])
  })

  it('should be able to fetch pagineted recent questions', async () => {
    for(let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        MakeQuestion()
      )
    }

    const { questions } = await sut.execute({
      page: 2
    })

    expect(questions).toHaveLength(2)
  })
})
