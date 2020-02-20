import Component from '../Component.js';
import PageItem from './PageItem.js';

class AddPageForm extends Component {
    onRender(dom){
        const user = this.props.user;
        const form = dom.querySelector('form');
        const ul = dom.querySelector('ul');

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
                    console.log(page);
                    const li = document.createElement('li');
                    li.textContent = page.title;
                    dom.appendChild(li);
                });
        });
    }
    renderHTML(){
        return /*html*/`
            <section>
                <form>
                    <label for="addPage">Enter title of new page: </label>
                    <input type="text" id="addPage" name="addPage" placeholder='e.g. "Biology"' />
                    <button>Add Page</button>
                </form>
                <ul>
                </ul>
            </section>
            `;
    }
}

export default AddPageForm;
