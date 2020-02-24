const Page = require('./Page');

describe('Pages model', () => {
    it('should require a title', () => {
        const page = new Page({
            pageDate: new Date('January 1, 2020')
        });

        const { errors } = page.validateSync();
        expect(errors.title.message).toEqual('Path `title` is required.');
    });

    it('should require a pageDate', () => {
        const page = new Page({
            title: 'a novel'
        });

        const { errors } = page.validateSync();
        expect(errors.pageDate.message).toEqual('Path `pageDate` is required.');
    });
});
