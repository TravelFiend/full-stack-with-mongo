import Component from '../Component.js';
import Header from '../common/Header.js';

class App extends Component {
    onRender(main){
        const header = new Header();
    }

    renderHTML(){
        return /*html*/`
            <main>
                <p class="lineOne subText">Type some stuff</p>
                <p class="lineThree">The Note Taking app of the Past!</p>
                <p class="lineTwo subText">Organize that stuff</p>
            </main>
        `;
    }
}

export default App;
