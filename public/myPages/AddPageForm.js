import Component from '../Component.js';

class AddPageForm extends Component {
    renderHTML(){
        return /*html*/`
      <form>
        <label for="addPage">Enter title of new page: </label>
        <input type="text" id="addPage" placeholder='e.g. "Biology"' />
        <button>Add Page</button>
      </form>
    `;
    }
}

export default AddPageForm;
