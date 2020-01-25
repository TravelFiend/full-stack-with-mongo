import Component from '../Component.js';

class App extends Component {
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
