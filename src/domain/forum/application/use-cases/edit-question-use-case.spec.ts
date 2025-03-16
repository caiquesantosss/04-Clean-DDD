import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { MakeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity'
import { EditQuestionUseCase } from './edit-question-use-case'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteúdo da pergunta',
    })

    const updatedQuestion = inMemoryQuestionsRepository.items[0]

    expect(updatedQuestion.Title).toBe('Pergunta teste')
    expect(updatedQuestion.Content).toBe('Conteúdo da pergunta')

    expect(updatedQuestion).toMatchObject({
      Title: 'Pergunta teste',
      Content: 'Conteúdo da pergunta',
    })
  })

  it('should not be able to edit a question', async () => {
    const newQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        title: 'Pergunta teste',
        content: 'Conteúdo da pergunta',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
