import Component from '../Component.js';

class NoteForm extends Component {
    onRender(form){
        const page = this.props.page;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const note = {
                pageId: page._is,
                noteTitle: formData.get('noteTitle'),
                text: formData.get('noteText'),
                noteDate: new Date.now()
            };

            fetch('/api/v1/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });
        });
    }

    renderHTML(){
        return /*html*/`
            <form>
                <label for="noteTitle">Note Title: </label>
                <input type="text" id="noteTitle" placeholder="" />
                <textarea id="noteText" placeholder="Type your note here"></textarea>
                <button>Add note</button>
            </form>
    `;
    }
}

export default NoteForm;
