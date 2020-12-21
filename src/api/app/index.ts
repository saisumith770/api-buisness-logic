import express from 'express'

import jwt from 'jsonwebtoken'

import { Router as activityRouter } from './activity'
import { Router as connectionRouter } from './connections'
import { Router as subscriptionRouter } from './subscription'
import { Router as userRouter } from './user'
import { Router as vodsRouter } from './vods'

//initializing the App Router
export const Router = express.Router()

//authenticate the requests
Router.use((req, res, next) => {
    const { access_token } = req.cookies
    jwt.verify(access_token, 'access token secret', (err: any, data: any) => {
        if (!err) next()
        else res.status(400).json({ status: "no access token provided" })
    })
})
Router.use((req, res, next) => {
    jwt.verify(req.body.csrf, 'csrf_token_secret', (err: any, data: any) => {
        if (data.access_token === req.cookies.access_token && !err) next()
        else res.status(400).json({ status: "invalid request" })
    })
})

//the router middlewares within app
Router.use('/activity', activityRouter)
Router.use('/connection', connectionRouter)
Router.use('/subscription', subscriptionRouter)
Router.use('/user', userRouter)
Router.use('/vod', vodsRouter)