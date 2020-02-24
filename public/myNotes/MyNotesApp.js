import Component from '../Component.js';
import Header from '../common/Header.js';
import NoteForm from './NoteForm.js';

class MyNotesApp extends Component {
    onRender(dom){
        const header = new Header();
        dom.prepend(header.renderDOM());
        let params = new URLSearchParams(document.location.search.substring(1));
        const pageId = params.get('id');

        const fetchActiveUser = async() => {
            const userObj = await fetch('/api/v1/auth/verify');
            return await userObj.json();
        };

        fetchActiveUser()
            .then(user => {
                if(!user._id) {
                    window.location.href = '../auth.html';
                }
                
                const userName = user.userName;
                const noteForm = new NoteForm({ pageId, userName });
                dom.appendChild(noteForm.renderDOM());
            });

    }

    renderHTML(){
        return /*html*/`
            <main></main>
        `;
    }
}

export default MyNotesApp;
