import Component from '../Component.js';

class PageItem extends Component {
    onRender(li){
        const page = this.props.page;

        li.addEventListener('click', () => {
            new URLSearchParams(`id=${page._id}`);
            // window.location.href = `../my-pages/id=${page._id}`;
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
