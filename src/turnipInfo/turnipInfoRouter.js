const TurnipService = require('./turnipInfoService')
const express = require('express')
const path = require('path')

const TurnipRouter = express.Router()
const jsonParser = express.json()

TurnipRouter.route('/')
.post(jsonParser, (req, res, next) => {
    const {island, sellbackprice, weekday, morning, evening, fulldate} = req.body
    for (const field of ['island', 'sellbackprice', 'weekday', 'morning', 'evening', 'fulldate']) {
        if (!req.body[field]) {
            return res.status(400).json({
                error: `Missing ${field} in request body`
            })
        }
    }
    const item = {
        island,
        sellbackprice,
        weekday,
        morning,
        evening,
        fulldate
    }

    TurnipService.addNewTurnipInfo(req.app.get('db'), item)
    .then(item => {
        res.status(201)
        .location(path.posix.join(req.originalUrl, `/${item.id}`))
        .json({
            id: item.id,
            island: item.island,
            sellbackprice: item.sellbackprice,
            weekday: item.weekday,
            morning: item.morning,
            evening: item.evening,
            fulldate: item.fulldate
        })
    })
})
TurnipRouter.route('/')
.get((req,res,next) => {
    TurnipService.getAllTurnipInfo(req.app.get('db'))
        .then(items => {
            if(!items) {
                res.json('There is currently no turnip info in the database')
            }
            res.json(items)
        })
        .catch(next)
})
TurnipRouter.route('/:id')
.delete((req,res,next) => {
    TurnipService.deleteTurnipInfo(req.app.get('db'), req.params.id)
    .then(() => {
        res.status(204).end()
    })
    .catch(next)
})
module.exports = TurnipRouter