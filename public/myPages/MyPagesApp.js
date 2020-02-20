import Component from '../Component.js';
import Header from '../common/Header.js';
import PageList from './PageList.js';
import AddPageForm from './AddPageForm.js';

class MyPagesApp extends Component {
    onRender(dom){
        const user = this.props.user;
        const header = new Header();
        dom.prepend(header.renderDOM());

        const pageList = new PageList({ pages: [] });
        dom.appendChild(pageList.renderDOM());

        const addPageForm = new AddPageForm({ user });
        dom.appendChild(addPageForm.renderDOM());

        const fetchUserPages = async() => {
            const pagesObj = await fetch(`/api/v1/pages/${user._id}`);
            const pages = await pagesObj.json();
            pageList.update({ pages });
        };

        fetchUserPages();
    }

    renderHTML(){
        const user = this.props.user;
        const pages = this.props.pages;

        return /*html*/`
            <div class="container">
                <h2>${user.userName}'s Pages</h2>
                <p>User Prop: ${user}</p>
                <p>Pages prop: ${pages}</p>
            </div>
        `;
    }
}

export default MyPagesApp;
