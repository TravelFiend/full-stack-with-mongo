import Component from '../Component.js';
import NoteItem from './NoteItem.js';

class NoteForm extends Component {
    onRender(dom){
        const pageId = this.props.pageId;
        console.log(pageId);
        
        const userName = this.props.userName;

        const form = dom.querySelector('form');
        const ul = dom.querySelector('ul');

        fetch(`/api/v1/notes/${pageId}`)
            .then(res => res.json())
            .then(notes => {
                notes.map(note => {
                    const noteItems = new NoteItem({ note });
                    ul.appendChild(noteItems.renderDOM());
                });
            });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const note = {
                pageId,
                author: userName,
                subtitle: formData.get('noteTitle'),
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
            })
                .then(res => res.json())
                .then(note => {
                    const noteItem = new NoteItem({ note });
                    ul.appendChild(noteItem.renderDOM());
                });

            form.reset();
        });
    }

    renderHTML(){
        return /*html*/`
            <section>
                <form id="noteForm">
                    <div id="noteTitle">
                        <label for="noteTitle">Note Title: </label>
                        <input type="text" name="noteTitle" placeholder="This is an optional field" />
                    </div>
                    <textarea name="noteText" placeholder="Type your note here"></textarea>
                    <button id="addNoteButton">Add note</button>
                </form>
                <ul>
                </ul>
            </section>
        `;
    }
}

export default NoteForm;
