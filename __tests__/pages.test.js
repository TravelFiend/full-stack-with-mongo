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

        await Note.create([
            {
                pageId: page._id,
                subtitle: 'Small title',
                author: 'A writer',
                text: 'some words they wrote',
                noteDate: new Date('January 2, 2020')
            }
        ]);
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates a page', () => {
        return request(app)
            .post('/api/v1/pages')
            .send({
                userId: user._id,
                title: 'Titling is hard',
                pageDate: new Date('January 1, 2020')
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    userId: expect.any(String),
                    title: 'Titling is hard',
                    pageDate: expect.any(String),
                    __v: 0
                });
            });
    });

    it('gets all pages', async() => {
        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', userName: 'GCarlin', password: 'biscuits' });

        return agent
            .get('/api/v1/pages')
            .then(pages => {
                pages.body.forEach(page => {
                    expect(page).toEqual({
                        _id: page._id.toString(),
                        userId: user._id.toString(),
                        title: page.title,
                        notes: [{
                            _id: expect.any(String),
                            author: 'A writer',
                            noteDate: '2020-01-02T08:00:00.000Z',
                            pageId: expect.any(String),
                            subtitle: 'Small title',
                            text: 'some words they wrote',
                            __v: 0,
                        }],
                        pageDate: page.pageDate,
                        __v: 0
                    });
                });
            });
    });

    it('gets a page by id', async() => {
        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', userName: 'GCarlin', password: 'biscuits' });

        return agent
            .get(`/api/v1/pages/${page._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: page._id.toString(),
                    userId: user._id.toString(),
                    title: 'Titling is hard',
                    pageDate: expect.any(String),
                    notes: [{
                        _id: expect.any(String),
                        pageId: page._id.toString(),
                        subtitle: 'Small title',
                        author: 'A writer',
                        text: 'some words they wrote',
                        noteDate: expect.any(String),
                        __v: 0
                    }],
                    __v: 0
                });
            });
    });

    it('updates a page', async() => {
        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', userName: 'GCarlin', password: 'biscuits' });

        return agent
            .patch(`/api/v1/pages/${page._id}`)
            .send({ title: 'It just got easier' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    userId: user._id.toString(),
                    title: 'It just got easier',
                    pageDate: expect.any(String),
                    __v: 0
                });
            });
    });

    it('deletes a page by id', async() => {
        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', userName: 'GCarlin', password: 'biscuits' });

        return agent
            .delete(`/api/v1/pages/${page._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: page._id.toString(),
                    userId: user._id.toString(),
                    title: 'Titling is hard',
                    pageDate: expect.any(String),
                    __v: 0
                });
            });
    });
});
