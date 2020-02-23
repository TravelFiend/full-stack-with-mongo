import Component from '../Component.js';

class PageItem extends Component {
    onRender(li){
        const page = this.props.page;

        li.addEventListener('click', () => {
            const queryStr = `?id=${page._id}`;
            window.location.href = '../my-notes.html' + queryStr;
        });

    }

    renderHTML(){
        const page = this.props.page;

        return /*html*/`
            <li>${page.title}</li>
        `;
    }
}

export default PageItem;
