require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Page = require('../lib/models/Page');
const User = require('../lib/models/User');

describe('app routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates a page', () => {
        return request(app)
            .post('/api/v1/pages')
            .send({
                title: 'Titling is hard',
                pageDate: new Date('January 1, 2020'),
                notes: [{ 
                    subtitle: 'Small title',
                    author: 'A writer',
                    text: 'some words they wrote',
                    noteDate: new Date('January 2, 2020')
                }]
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    title: 'Titling is hard',
                    pageDate: expect.any(String),
                    notes: [{
                        _id: expect.any(String),
                        subtitle: 'Small title',
                        author: 'A writer',
                        text: 'some words they wrote',
                        noteDate: expect.any(String)
                    }],
                    __v: 0
                });
            });
    });

    it('gets all pages', async() => {
        await User.create({ email: 'george@carlin.com', username: 'GCarlin', password: 'biscuits' });

        const agent = request.agent(app);

        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', username: 'GCarlin', password: 'biscuits' });

        const pages = await Page.create([{
            title: 'Titling is hard',
            pageDate: new Date('January 1, 2020'),
            notes: [{
                subtitle: 'Small title',
                author: 'A writer',
                text: 'some words they wrote',
                noteDate: new Date('January 2, 2020')
            }]
        }, {
            title: 'Bears are cool',
            pageDate: new Date('January 2, 2020'),
            notes: [{
                subtitle: 'Even smaller title',
                author: 'A different writer',
                text: 'More words for the birds',
                noteDate: new Date('January 3, 2020')
            }]
        }]);
        return agent
            .get('/api/v1/pages')
            .then(res => {
                pages.forEach(page => {
                    expect(res.body).toContainEqual({
                        _id: page._id.toString(),
                        title: page.title,
                        pageDate: page.pageDate.toISOString(),
                        notes: [{
                            _id: expect.any(String),
                            subtitle: page.notes[0].subtitle,
                            author: page.notes[0].author,
                            text: page.notes[0].text,
                            noteDate: expect.any(String)
                        }],
                        __v: 0
                    });
                });
            });
    });

    it('gets a page by id', async() => {
        await User.create({ email: 'george@carlin.com', username: 'GCarlin', password: 'biscuits' });

        const agent = request.agent(app);

        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', username: 'GCarlin', password: 'biscuits' });

        const page = await Page.create({
            title: 'Titling is hard',
            pageDate: new Date('January 1, 2020'),
            notes: [{
                subtitle: 'Small title',
                author: 'A writer',
                text: 'some words they wrote',
                noteDate: new Date('January 2, 2020')
            }]
        });

        return agent
            .get(`/api/v1/pages/${page._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: page._id.toString(),
                    title: 'Titling is hard',
                    pageDate: expect.any(String),
                    notes: [{
                        _id: expect.any(String),
                        subtitle: 'Small title',
                        author: 'A writer',
                        text: 'some words they wrote',
                        noteDate: expect.any(String)
                    }],
                    __v: 0
                });
            });
    });

    it('updates a page', async() => {
        await User.create({ email: 'george@carlin.com', username: 'GCarlin', password: 'biscuits' });

        const agent = request.agent(app);

        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', username: 'GCarlin', password: 'biscuits' });

        const page = await Page.create({
            title: 'Titling is hard',
            pageDate: new Date('January 1, 2020'),
            notes: [{
                subtitle: 'Small title',
                author: 'A writer',
                text: 'some words they wrote',
                noteDate: new Date('January 2, 2020')
            }]
        });

        return agent
            .patch(`/api/v1/pages/${page._id}`)
            .send({ title: 'It just got easier' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    title: 'It just got easier',
                    pageDate: expect.any(String),
                    notes: [{
                        _id: expect.any(String),
                        subtitle: 'Small title',
                        author: 'A writer',
                        text: 'some words they wrote',
                        noteDate: expect.any(String)
                    }],
                    __v: 0
                });
            });
    });

    it('deletes a page by id', async() => {
        await User.create({ email: 'george@carlin.com', username: 'GCarlin', password: 'biscuits' });

        const agent = request.agent(app);

        await agent
            .post('/api/v1/auth/login')
            .send({ email: 'george@carlin.com', username: 'GCarlin', password: 'biscuits' });

        const page = await Page.create({
            title: 'Titling is hard',
            pageDate: new Date('January 1, 2020'),
            notes: [{
                subtitle: 'Small title',
                author: 'A writer',
                text: 'some words they wrote',
                noteDate: new Date('January 2, 2020')
            }]
        });

        return agent
            .delete(`/api/v1/pages/${page._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: page._id.toString(),
                    title: 'Titling is hard',
                    pageDate: expect.any(String),
                    notes: [{
                        _id: expect.any(String),
                        subtitle: 'Small title',
                        author: 'A writer',
                        text: 'some words they wrote',
                        noteDate: expect.any(String)
                    }],
                    __v: 0
                });
            });
    });
});
