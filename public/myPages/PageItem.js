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
                alert('This notebook cannot be deleted because it has notes');
                return;
            }

            const result = confirm('Are you sure you want to delete this page?');
            if(result) {
                fetch(`/api/v1/pages/${page._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                li.classList.add('hidden');
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
                <div>
                    <h3>${page.title}</h3>
                    <hr />
                </div>
                <div class="buttons">
                    <div class="editButton"></div>
                    <div class="deleteButton"></div>
                </div>
            </li>
        `;
    }
}

export default PageItem;
