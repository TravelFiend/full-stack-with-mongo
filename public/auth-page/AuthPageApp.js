import Component from '../Component.js';
import Header from '../common/Header.js';
import UserLogin from './UserLogin.js';
import UserLogout from './UserLogout.js';
import UserSignUp from './UserSignUp.js';

class AuthPageApp extends Component {
    async onRender(dom) {
        const user = this.props.user;

        const header = new Header();
        dom.prepend(header.renderDOM());

        if(user._id){
            const logoutSpot = dom.querySelector('#logout-spot');
            const logout = new UserLogout({ user });
            logoutSpot.prepend(logout.renderDOM());
        }
        
        const signUpSpot = dom.querySelector('#sign-up-spot');
        const signup = new UserSignUp();
        signUpSpot.prepend(signup.renderDOM());

        const loginSpot = dom.querySelector('#login-spot');
        const login = new UserLogin();
        loginSpot.prepend(login.renderDOM());

        const toggleToSignUp = dom.querySelector('#to-sign-up');
        toggleToSignUp.addEventListener('click', () => {
            signUpSpot.classList.remove('hidden');
            loginSpot.classList.add('hidden');
        });
        
        const toggleToLogin = dom.querySelector('#to-login');
        toggleToLogin.addEventListener('click', () => {
            loginSpot.classList.remove('hidden');
            signUpSpot.classList.add('hidden');
        });
    }

    renderHTML(){
        const user = this.props.user;
        
        if(user.userName){
            return /*html*/`
                <main>
                    <div class="auther">
                        <section id="logout-spot"></section>
                    </div>
                    <div class="opaqueness"></div>
                </main>
            `;
        }
        return /*html*/`
            <main>
                <div class="error"></div>
                <div class="auther">
                    <section id="login-spot"></section>

                    <section class="hidden" id="sign-up-spot"></section>
                </div>
                <div class="opaqueness"></div>
            </main>
        `;
    }
}

export default AuthPageApp;
