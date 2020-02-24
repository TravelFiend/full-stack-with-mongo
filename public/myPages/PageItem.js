import Component from '../Component.js';

class PageItem extends Component {
    onRender(li){
        const page = this.props.page;

        li.addEventListener('click', () => {
            window.location.href = `./my-notes.html?id=${page._id}`;
        });

    }

    renderHTML(){
        const page = this.props.page;

        return /*html*/`
            
            <li>${page.title}
                <div class="buttons">
                    <div class="editButton"></div>
                    <div class="deleteButton"></div>
                </div>
            </li>
        `;
    }
}

export default PageItem;
