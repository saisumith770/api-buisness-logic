import express from 'express'

import { getInbox, createFeed, setState } from '../../../index'

export const Router = express.Router()

//get your inbox
//a few fixes to make in the core
Router.post('/inbox', (req, res) => {
    getInbox(req.params.user_id, req.body.date, req.body.feed_id, req.prisma)
        .then(data => res.status(200).json({
            current_inbox: data
        }))
        .catch(err => res.status(400).json({ err }))
})

//upload a feed
//I will make this feature automatic for new posts uploaded
Router.post('/feed', (req, res) => {
    createFeed(req.body.feed, req.params.user_id, req.params.username, req.prisma)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({ err }))
})

//set a new state
Router.post('/setState', (req, res) => {
    setState(req.body.state, req.params.user_id, req.prisma)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({ err }))
})