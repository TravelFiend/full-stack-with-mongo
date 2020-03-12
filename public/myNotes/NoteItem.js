import Component from '../Component.js';

class NoteItem extends Component {
    onRender(li){
        const note = this.props.note;

        const delButton = li.querySelector('.deleteButton');
        const editButton = li.querySelector('.editButton');
        const form = li.querySelector('form');
        const input = li.querySelector('input');
        const textarea = li.querySelector('textarea');

        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');

        h4.textContent = note.subtitle;
        p.textContent = note.text;
        span1.textContent = note.author;
        span2.textContent = note.noteDate;
        span3.classList.add('deleteButton');

        p.appendChild(span3);
        h4.appendChild(span1);
        h4.appendChild(span2);
        li.prepend(p);
        li.prepend(h4);

        delButton.addEventListener('click', () => {
            const result = confirm('Are you sure you want to delete this note?');
            if(result) {
                fetch(`/api/v1/notes/${note._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                li.classList.add('hidden');
            }
        });

        editButton.addEventListener('click', () => {
            form.classList.toggle('hidden');
            p.classList.toggle('hidden');
            h4.classList.toggle('hidden');
            input.value = note.subtitle;
            textarea.value = note.text;
        });

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(event.target);

            const updatedNoteObj = {
                subtitle: formData.get('subtitlePatch'),
                text: formData.get('notePatch')
            };

            h4.textContent = formData.get('subtitlePatch');
            p.textContent = formData.get('notePatch');

            fetch(`api/v1/notes/${note._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedNoteObj)
            });

            form.classList.toggle('hidden');
            p.classList.toggle('hidden');
            h4.classList.toggle('hidden');
        });
    }

    renderHTML() {
        return /*html*/`
            <li>
                <form class="hidden">
                    <div class="patchIt">
                        <label class="updateLabels" for="subtitlePatch">Note Title: </label>
                        <label class="updateLabels" for="notePatch">Note Text: </label>
                    </div>
                    <div class="patchIt">
                        <input type="text" id="subtitlePatch" name="subtitlePatch" />
                        <textarea type="text" id="notePatch" name="notePatch"></textarea>
                    </div>
                    <button id="updateNoteButton">Update note</button>
                </form>
                <div class="buttons">
                    <img src="../assets/edit.png" class="editButton">
                    <img src="../assets/x.png" class="deleteButton">
                </div>
            </li>
        `;
    }
}

export default NoteItem;
