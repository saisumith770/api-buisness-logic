import { feed, PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

export async function createFeed(param: { type: string, message: string }, user_id: string, username: string, prisma: PrismaClient): Promise<feed> {
    var result: feed = await prisma.feed.create({
        data: {
            user_id: user_id,
            feed_id: v4(),
            username: username,
            message: param.message,
            timestamp: new Date()
        }
    })
    return result
}

export async function getInbox(user_id: string, prisma: PrismaClient): Promise<feed[]> {
    var subscriptions: Array<any> = await prisma.subscription_manager.findMany({
        where: {
            viewer_id: user_id
        },
        select: {
            creator_id: true
        }
    })
    subscriptions = await subscriptions.map(creator => (creator.creator_id))
    var result: feed[] = await prisma.feed.findMany({
        where: {
            user_id: {
                in: subscriptions
            }
        },
        orderBy: [
            {
                timestamp: 'desc'
            }
        ]
    })
    return result
}