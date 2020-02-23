import Component from '../Component.js';

class NoteForm extends Component {
    onRender(form){
        const pageId = this.props.pageId;
        const userName = this.props.userName;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const note = {
                pageId,
                author: userName,
                noteTitle: formData.get('noteTitle'),
                text: formData.get('noteText'),
                noteDate: new Date()
            };

            fetch('/api/v1/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(note)
            });
        });
    }

    renderHTML(){
        return /*html*/`
            <form id="noteForm">
                <label for="noteTitle">Note Title: </label>
                <input type="text" name="noteTitle" placeholder="" />
                <textarea name="noteText" placeholder="Type your note here"></textarea>
                <button>Add note</button>
            </form>
    `;
    }
}

export default NoteForm;
