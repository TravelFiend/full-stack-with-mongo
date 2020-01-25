const { Router } = require('express');
const Page = require('../models/Page');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
    .post('/', (req, res, next) => {
        Page
            .create(req.body)
            .then(page => res.send(page))
            .catch(next);
    })

    .get('/', ensureAuth, (req, res, next) => {
        Page
            .find()
            .then(pages => res.send(pages))
            .catch(next);
    })

    .get('/:id', ensureAuth, (req, res, next) => {
        Page
            .findById(req.params.id)
            .then(page => res.send(page.toJSON()))
            .catch(next);
    })

    .patch('/:id', ensureAuth, (req, res, next) => {
        Page
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(page => res.send(page.toJSON()))
            .catch(next);
    })

    .delete('/:id', ensureAuth, (req, res, next) => {
        Page
            .findByIdAndDelete(req.params.id)
            .then(page => res.send(page))
            .catch(next);
    });
