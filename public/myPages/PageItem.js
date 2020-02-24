import Component from '../Component.js';

class PageItem extends Component {
    onRender(li){
        const page = this.props.page;
        console.log(page);
        
        const delButton = li.querySelector('.deleteButton');
        const editButton = li.querySelector('.editButton');
        const title = li.querySelector('h3');

        delButton.addEventListener('click', () => {
            if(page.notes.length){
                alert('This page cannot be deleted because it has notes');
            }

            const result = confirm('Want to delete?');
            if(result){
                fetch();
            }
        });

        editButton.addEventListener('click', () => {
            console.log('this will edit');
        });

        title.addEventListener('click', () => {
            window.location.href = `./my-notes.html?id=${page._id}`;
        });

    }

    renderHTML(){
        const page = this.props.page;

        return /*html*/`
            
            <li>
                <h3>${page.title}</h3>
                <div class="buttons">
                    <div class="editButton"></div>
                    <div class="deleteButton"></div>
                </div>
            </li>
        `;
    }
}

export default PageItem;
