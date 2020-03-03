const Note = require ('./Note');

describe('Note model', () => {
    let note;
    beforeEach(() => {
        note = new Note({});
    });

    it('should require a pageId', () => {
        const { errors } = note.validateSync();
        expect(errors.pageId.message).toEqual('Path `pageId` is required.');
    });

    it('should require an author', () => {
        const { errors } = note.validateSync();
        expect(errors.author.message).toEqual('Path `author` is required.');
    });

    it('should require text', () => {
        const { errors } = note.validateSync();
        expect(errors.text.message).toEqual('Path `text` is required.');
    });

    it('should require a pageId', () => {
        const { errors } = note.validateSync();
        expect(errors.noteDate.message).toEqual('Path `noteDate` is required.');
    });
});
