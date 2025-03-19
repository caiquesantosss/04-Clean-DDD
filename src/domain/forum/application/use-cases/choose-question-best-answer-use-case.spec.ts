import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { MakeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { MakeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    )
  })

  it('should be able to choose a questio best answer', async () => {
    const question = MakeQuestion()
    const answer = MakeAnswer({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      AnswerId: answer.id.toString(),
      AuthorId: question.AuthorId.toString()
    })

    expect(inMemoryQuestionsRepository.items[0].BestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose a another user question best answer', async () => {
    const question = MakeQuestion({
        authorId: new UniqueEntityId('author-1'),
    })
    const answer = MakeAnswer({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      AnswerId: answer.id.toString(),
      AuthorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
