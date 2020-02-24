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

    let notes;
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

        notes = await Note.create([{
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

    it('should create a note', () => {
        return request(app)
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
                    noteDate: '2019-10-12T07:00:00.000Z',
                    __v: 0
                });
            });
    });
});
