const Page = require('./Page');

describe('Pages model', () => {
    it('should require a title', () => {
        const page = new Page({
            pageDate: new Date('January 1, 2020'),
            notes: [{
                subtitle: 'marine',
                author: 'Beatles',
                text: 'Yellow submarine',
                noteDate: new Date('January 2, 2020')
            }]
        });

        const { errors } = page.validateSync();
        expect(errors.title.message).toEqual('Path `title` is required.');
    });

    it('should require a pageDate', () => {
        const page = new Page({
            title: 'a novel',
            notes: [{
                subtitle: 'marine',
                author: 'Beatles',
                text: 'Yellow submarine',
                noteDate: new Date('January 2, 2020')
            }]
        });

        const { errors } = page.validateSync();
        expect(errors.pageDate.message).toEqual('Path `pageDate` is required.');
    });

    it('should require a subtitle in notes field', () => {
        const page = new Page({
            title: 'a novel',
            notes: [{
                author: 'Beatles',
                text: 'Yellow submarine',
                noteDate: new Date('January 2, 2020')
            }]
        });

        const { errors } = page.notes[0].validateSync();
        expect(errors.subtitle.message).toEqual('Path `subtitle` is required.');
    });

    it('should require an author in notes field', () => {
        const page = new Page({
            title: 'a novel',
            notes: [{
                subtitle: 'marine',
                text: 'Yellow submarine',
                noteDate: new Date('January 2, 2020')
            }]
        });

        const { errors } = page.notes[0].validateSync();
        expect(errors.author.message).toEqual('Path `author` is required.');
    });

    it('should require text in notes field', () => {
        const page = new Page({
            title: 'a novel',
            notes: [{
                subtitle: 'marine',
                author: 'Beatles',
                noteDate: new Date('January 2, 2020')
            }]
        });

        const { errors } = page.notes[0].validateSync();
        expect(errors.text.message).toEqual('Path `text` is required.');
    });

    it('should require a noteDate in notes field', () => {
        const page = new Page({
            title: 'a novel',
            notes: [{
                subtitle: 'marine',
                author: 'Beatles',
                text: 'Yellow submarine'
            }]
        });

        const { errors } = page.notes[0].validateSync();
        expect(errors.noteDate.message).toEqual('Path `noteDate` is required.');
    });
});
