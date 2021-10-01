const express = require('express');
const subscriber = require('../models/subscriber');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// getting all

router.get('/', async (req,res)=> {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            code: 500
        })
    }
})

// getting one

router.get('/:id', getSubscriber, (req,res)=>{
    res.send(res.subscriber);
    res.end();
})
// creating one

router.post('/', async (req,res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubcriber = await subscriber.save();
        res.status(201).json(newSubcriber);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// updating one

router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
      res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
      const updatedSubscriber = await res.subscriber.save()
      res.json(updatedSubscriber)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
// delete one

router.delete('/:id', getSubscriber, async (req,res)=>{
    try {
        await res.subscriber.remove();
        res.send({ message: "deleted subscriber" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

async function getSubscriber(req, res, next){
    try {
        var subscriber = await Subscriber.findById(req.params.id)
        console.log(subscriber)
        if (subscriber === null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router