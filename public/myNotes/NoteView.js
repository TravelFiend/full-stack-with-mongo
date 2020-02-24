import Component from '../Component.js';
import NoteItem from './NoteItem.js';

class NoteView extends Component {
    onRender(dom){
        const noteItems = new NoteItem();
        dom.appendChild(noteItems.renderDOM());
    }

    renderHTML(){
        return /*html*/`
            <ul></ul>
        `;
    }
}

export default NoteView;
