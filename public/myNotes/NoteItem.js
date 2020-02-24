import Component from '../Component.js';

class NoteItem extends Component {
    onRender(li){
        const note = this.props.note;
        const delButton = li.querySelector('.deleteButton');
        const editButton = li.querySelector('.editButton');

        delButton.addEventListener('click', () => {
            console.log('this should delete');
        });

        editButton.addEventListener('click', () => {
            console.log('this will edit');
        });

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

        h4.appendChild(span1);
        h4.appendChild(span2);
        p.appendChild(span3);
        li.prepend(p);
        li.prepend(h4);
    }

    renderHTML() {
        return /*html*/`
            <li>
                <div class="buttons">
                    <div class="editButton"></div>
                    <div class="deleteButton"></div>
                </div>
            </li>
        `;
    }
}

export default NoteItem;
