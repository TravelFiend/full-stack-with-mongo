const { Router } = require('express');
const Page = require('../models/Pages');

module.exports = Router()
    .post('/', (req, res, next) => {
        Page
            .create(req.body)
            .then(page => res.send(page))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Page
            .find()
            .then(pages => res.send(pages))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Page
            .findById(req.params.id)
            .then(page => res.send(page.toJSON()))
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {
        Page
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(page => res.send(page.toJSON()))
            .catch(next);
    });
