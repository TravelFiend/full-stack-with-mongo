import Component from './PageItem.js';
import PageItem from './PageItem.js';

class PageList extends Component {
    onRender(dom){
        const pageList = this.props.pages;

        pageList.forEach(page => {
            const pageItem = new PageItem({ page });
            dom.appendChild(pageItem.renderDOM());
        });
    }

    renderHTML(){
        return /*html*/`
            <div id="pages"></div>
        `;
    }
}

export default PageList;
