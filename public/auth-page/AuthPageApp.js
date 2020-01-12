import Component from '../Component.js';
import Header from '../common/Header.js';
import UserLogin from './UserLogin.js';
import UserSignUp from './UserSignUp.js';

class AuthPageApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
        
        const signUpSpot = dom.querySelector('#sign-up-spot');
        const loginSpot = dom.querySelector('#login-spot');
        const signup = new UserSignUp();
        const login = new UserLogin();
        signUpSpot.appendChild(signup.renderDOM());
        loginSpot.appendChild(login.renderDOM());

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

        if(user){
            return `
                <div class = "container" >
                    <section id="logout-section">
                        <p>Signed in as ${user}<p>
                        <div>
                            <button>To My Notes</button>
                            <button>Logout</button>
                        </div>
                    </section>
                </div>
            `;
        }
        return /*html*/`
            <main>
                <div class="error"></div>
                    <section id="login-spot">
                        <div class="toggle">
                            <button class="auth-button" id="to-sign-up">New User?</button>
                        </div>
                    </section>

                    <section class="hidden" id="sign-up-spot">
                        <div class="toggle">
                            <button class="auth-button" id="to-login">Already have an account?</button>
                        </div>
                    </section>
            </main>
        `;
    }
}

export default AuthPageApp;
