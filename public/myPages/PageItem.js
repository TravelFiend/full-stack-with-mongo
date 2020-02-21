import Component from '../Component.js';

class PageItem extends Component {
    renderHTML(){
        const page = this.props.page;

        return /*html*/`
            <li name=${page._id}>${page.title}</li>
        `;
    }
}

export default PageItem;
