require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Page = require('../lib/models/Page');
const User = require('../lib/models/User');
const Note = require('../lib/models/Note');

describe('app routes', () => {
    const agent = request.agent(app);

    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    let page;
    let note;
    let user;
    beforeEach(async() => {
        user = await User.create({
            email: 'george@carlin.com',
            userName: 'GCarlin',
            password: 'biscuits'
        });

        page = await Page.create({
            userId: user._id,
            title: 'Titling is hard',
            pageDate: new Date('January 1, 2020')
        });

        note = await Note.create([{
            pageId: page._id,
            subtitle: 'Small title',
            author: 'A writer',
            text: 'some words they wrote',
            noteDate: new Date('January 2, 2020')
        }]);
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('should create a note', async() => {
        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', userName: 'GCarlin', password: 'biscuits' });

        await agent
            .post('/api/v1/notes')
            .send({
                pageId: page._id,
                author: user.userName,
                subtitle: 'TAP',
                text: 'The Abyssal Plane',
                noteDate: 'October 12, 2019'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    pageId: page._id.toString(),
                    author: user.userName.toString(),
                    subtitle: 'TAP',
                    text: 'The Abyssal Plane',
                    noteDate: expect.any(String),
                    __v: 0
                });
            });
    });

    it('should get all notes from associated pageId', async() => {
        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', userName: 'GCarlin', password: 'biscuits' });

        await Note.create({
            pageId: page._id,
            subtitle: 'medium title',
            author: 'Bob',
            text: 'jingle bells',
            noteDate: new Date('January 1, 2020')
        });

        await agent
            .get(`/api/v1/notes/${page._id}`)
            .then(notes => {
                expect(notes.body).toEqual([{
                    _id: expect.any(String),
                    pageId: expect.any(String),
                    author: 'A writer',
                    noteDate: expect.any(String),
                    subtitle: 'Small title',
                    text: 'some words they wrote',
                    __v: 0,
                }, {
                    _id: expect.any(String),
                    pageId: expect.any(String),
                    author: 'Bob',
                    noteDate: expect.any(String),
                    subtitle: 'medium title',
                    text: 'jingle bells',
                    __v: 0,
                }]);
            });
    });

    it('updates a page', async() => {
        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', userName: 'GCarlin', password: 'biscuits' });

        return agent
            .patch(`/api/v1/notes/${note[0]._id}`)
            .send({ author: 'Ghost' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: note[0]._id.toString(),
                    pageId: page._id.toString(),
                    subtitle: 'Small title',
                    author: 'Ghost',
                    text: 'some words they wrote',
                    noteDate: note[0].noteDate.toISOString(),
                    __v: 0
                });
            });
    });

    it('should delete a note by id', async() => {
        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', userName: 'GCarlin', password: 'biscuits' });

        await agent
            .delete(`/api/v1/notes/${note[0]._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: note[0]._id.toString(),
                    pageId: page._id.toString(),
                    subtitle: 'Small title',
                    author: 'A writer',
                    text: 'some words they wrote',
                    noteDate: note[0].noteDate.toISOString(),
                    __v: 0
                });
            });
    });
});
