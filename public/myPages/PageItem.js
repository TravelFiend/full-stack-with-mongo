import Component from '../Component.js';

class PageItem extends Component {
    renderHTML(){
        const page = this.props.page;

        return /*html*/`
            <div>${page.title}</div>
        `;
    }
}

export default PageItem;
