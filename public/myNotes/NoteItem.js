import Component from '../Component.js';

class NoteItem extends Component {
    onRender(ul){
        const notes = [{
            '_id': '5e525054e9db0e3665dd7a3c',
            'pageId': '5e4f7f71abfbc004ad667ed3',
            'author': 'shoe',
            'text': 'This is only a test',
            'noteDate': '2020-02-23T10:13:40.778Z',
            '__v': 0
        },
        {
            '_id': '5e5341fc1c724e447d1d8ac3',
            'pageId': '5e4f7f71abfbc004ad667ed3',
            'subtitle': 'We\'re delicious',
            'author': 'Randy Savage',
            'text': 'Snap into a Slim Jim',
            'noteDate': '2020-03-20T20:34:00.000Z',
            '__v': 0
        }
        ];

        notes.map(note => {
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
        });
    }

    renderHTML() {
        return /*html*/`
            <li></li>
        `;
    }
}

export default NoteItem;
