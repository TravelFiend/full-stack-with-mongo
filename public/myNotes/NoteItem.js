import Component from '../Component.js';

class NoteItem extends Component {
    onRender(ul){
        const note = this.props.note;

        const li = document.createElement('li');
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        h1.textContent = note.subtitle;
        p.textContent = note.text;
        span1.textContent = note.author;
        span2.textContent = note.noteDate;
        p.appendChild(span1);
        p.appendChild(span2);
        li.prepend(p);
        li.prepend(h1);
        ul.appendChild(li);
    }

    renderHTML() {
        return /*html*/`
            <li></li>
        `;
    }
}

export default NoteItem;
