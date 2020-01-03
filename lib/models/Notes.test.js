const Notes = require('../models/Notes');

describe('Notes model', () => {
    describe('subtitle', () => {
        it('should require a subtitle', () => {
            const note = new Notes({
                author: 'Mikey G',
                text: 'I\'m learning stuff',
                noteDate: new Date('January 3, 2020')
            });

            const {
                errors
            } = note.validateSync();
            expect(errors.subtitle.message).toEqual('Path `subtitle` is required.');
        });
    });

    describe('author', () => {
        it('should require an author', () => {
            const note = new Notes({
                subtitle: 'sandwich',
                text: 'I\'m learning stuff',
                noteDate: new Date('January 3, 2020')
            });

            const {
                errors
            } = note.validateSync();
            expect(errors.author.message).toEqual('Path `author` is required.');
        });
    });

    describe('text', () => {
        it('should require text', () => {
            const note = new Notes({
                subtitle: 'sandwich',
                author: 'Mikey G',
                noteDate: new Date('January 3, 2020')
            });

            const {
                errors
            } = note.validateSync();
            expect(errors.text.message).toEqual('Path `text` is required.');
        });
    });

    describe('noteDate', () => {
        it('should require a noteDate', () => {
            const note = new Notes({
                subtitle: 'sandwich',
                author: 'Mikey G',
                text: 'I\'m learning stuff',
            });

            const {
                errors
            } = note.validateSync();
            expect(errors.noteDate.message).toEqual('Path `noteDate` is required.');
        });
    });
});
