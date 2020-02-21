import Component from '../Component.js';
import Header from '../common/Header.js';
import AddPageForm from './AddPageForm.js';

class MyPagesApp extends Component {
    onRender(dom){
        const user = this.props.user;
        const header = new Header();
        dom.prepend(header.renderDOM());
        
        const addPageForm = new AddPageForm({ user, pages: [] });
        dom.appendChild(addPageForm.renderDOM());
        
        const fetchUserPages = async() => {
            const pagesObj = await fetch('/api/v1/pages');
            const pages = await pagesObj.json();
            addPageForm.update({ pages });
        };

        fetchUserPages();
    }

    renderHTML(){
        const user = this.props.user;

        return /*html*/`
            <div class="container">
                <h2>${user.userName}'s Pages</h2>
            </div>
        `;
    }
}

export default MyPagesApp;
