import Component from '../Component.js';

class NoteItem extends Component {
    onRender(li){
        const note = this.props.note;

        const delButton = li.querySelector('.deleteButton');
        const editButton = li.querySelector('.editButton');
        const form = li.querySelector('form');

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
        });
    }

    renderHTML() {
        const note = this.props.note;

        return /*html*/`
            <li>
                <form class="hidden">
                    <input type="text" id="subtitlePatch" name="subtitlePatch" />
                    <input type="text" id="notePatch" name="notePatch" />
                    <button>Update note</button>
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
