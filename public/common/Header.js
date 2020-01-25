import Component from '../Component.js';

class Header extends Component {
    renderHTML(){
        return /*html*/`
        <header>
            <h1>Notable Notes</h1>
            <nav>
                <a href="./auth.html">Signup/Login</a>
                <a href="./my-pages.html">My Pages</a>
            </nav>
        </header>
        `;
    }
}

export default Header;
