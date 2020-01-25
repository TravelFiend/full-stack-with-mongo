import Component from '../Component.js';
import Header from '../common/Header.js';
import PageList from './PageList.js';

class MyPagesApp extends Component {
    onRender(dom){
        const header = new Header();
        dom.prepend(header.renderDOM());

        const pageList = new PageList({ pages: [] });
        dom.appendChild(pageList.renderDOM());

        const fetchUserPages = async() => {
            const pagesObj = await fetch('/api/v1/pages');
            const pages = await pagesObj.json();
            pageList.update({ pages });
        };

        fetchUserPages();
    }

    renderHTML(){
        const user = JSON.stringify(this.props.user);

        return /*html*/`
            <div class="container">
                <p>${user}</p>
            </div>
        `;
    }
}

export default MyPagesApp;
