import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswerRepository = {
    create: async (answer: Answer) => {
        return 
    }
}

test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    authorId: '1',
    content: 'Nova resposta!',
  })

  expect(answer.Content).toEqual('Nova resposta!')
})
