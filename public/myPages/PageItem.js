import Component from '../Component.js';

class PageItem extends Component {
    onRender(li){
        const page = this.props.page;
        console.log(page);
        
        const delButton = li.querySelector('.deleteButton');
        const editButton = li.querySelector('.editButton');
        const button = li.querySelector('button');
        const title = li.querySelector('h3');
        const form = li.querySelector('form');
        const input = li.querySelector('input');

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
            title.classList.toggle('hidden');
            form.classList.toggle('hidden');
            input.value = page.title;
        });

        title.addEventListener('click', () => {
            window.location.href = `./my-notes.html?id=${page._id}`;
        });

        
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const newTitle = formData.get('titlePatch');
            const newTitleObj = { title: newTitle };
            title.textContent = newTitle;
            input.value = newTitle;

            fetch(`api/v1/pages/${page._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTitleObj)
            });

            title.classList.toggle('hidden');
            form.classList.toggle('hidden');
        });
    }

    renderHTML(){
        const page = this.props.page;

        return /*html*/`
            
            <li>
                <div>
                    <h3>${page.title}</h3>
                    <form class="hidden">
                        <input type="text" id="titlePatch" name="titlePatch" />
                        <button>Update Title</button>
                    </form>
                    <hr />
                </div>
                <div class="buttons">
                    <img src="../assets/edit.png" class="editButton">
                    <img src="../assets/x.png" class="deleteButton">
                </div>
            </li>
        `;
    }
}

export default PageItem;
