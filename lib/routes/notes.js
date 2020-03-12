const { Router } = require('express');
const Note = require('../models/Note');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
    .post('/', ensureAuth,  (req, res, next) => {
        Note
            .create(req.body)
            .then(note => res.send(note))
            .catch(next);
    })

    .get('/:id', ensureAuth, (req, res, next) => {
        Note
            .find({ pageId: req.params.id })
            .then(notes => res.send(notes))
            .catch(next);
    })

    .patch('/:id', ensureAuth, (req, res, next) => {
        Note
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(updatedNote => res.send(updatedNote))
            .catch(next);
    })

    .delete('/:id', ensureAuth, (req, res, next) => {
        Note
            .findByIdAndDelete(req.params.id)
            .then(note => res.send(note))
            .catch(next);
    });
