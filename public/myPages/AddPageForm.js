import Component from '../Component.js';
import PageItem from './PageItem.js';

class AddPageForm extends Component {
    onRender(dom){
        const user = this.props.user;
        const pages = this.props.pages;
        
        const form = dom.querySelector('form');
        const ul = dom.querySelector('ul');

        pages.forEach(page => {
            const pageItem = new PageItem({ page });
            ul.prepend(pageItem.renderDOM());
        });

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(event.target);

            const page = {
                title: formData.get('addPage'),
                userId: user._id,
                pageDate: new Date()
            };

            fetch('/api/v1/pages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(page)
            })
                .then(res => res.json())
                .then(page => {
                    const pageItem = new PageItem({ page });
                    ul.prepend(pageItem.renderDOM());
                });

            form.reset();
        });
    }
    renderHTML(){
        return /*html*/`
            <section>
                <form id="addPageForm">
                    <label for="addPage">Enter title of new Notebook: </label>
                    <input type="text" id="addPage" name="addPage" placeholder='e.g. "Biology"' />
                    <button id="addPage">Add Notebook</button>
                </form>
                <ul>
                </ul>
            </section>
            `;
    }
}

export default AddPageForm;
