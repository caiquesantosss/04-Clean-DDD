import { UniqueEntityId } from '@/core/entities/unique-entity'
import { Notification } from '../../enterprise/entities/notification'
import { Either, right } from '@/core/either'
import { NotificationRepository } from '../repositories/notification-repository'

interface NotificationRequest {
  recipientId: string
  title: string
  content: string
  readAt?: string
}

type NotificationResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class NotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: NotificationRequest): Promise<NotificationResponse> {
    const notification = Notification.create({
        recipientId: new UniqueEntityId(recipientId),
        title,
        content,
    })

    await this.notificationRepository.create(notification)

    return right({ notification })
  }
}
