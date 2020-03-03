import Component from '../Component.js';
import Header from '../common/Header.js';
import UserLogin from './UserLogin.js';
import UserSignUp from './UserSignUp.js';

class AuthPageApp extends Component {
    async onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
        
        const signUpSpot = dom.querySelector('#sign-up-spot');
        const loginSpot = dom.querySelector('#login-spot');
        const signup = new UserSignUp();
        const login = new UserLogin();
        signUpSpot.prepend(signup.renderDOM());
        loginSpot.prepend(login.renderDOM());
        
        // const logoutButton = dom.querySelector('#logout-button');
        // logoutButton.addEventListener('click', () => {
        //     console.log('SCHNIKLEFRITZ');

        //     fetch('/api/v1/auth/logout', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        // });

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

        const toPages = dom.querySelector('#toPages');
        toPages.addEventListener('click', () => {
            window.location.href = '../my-pages.html';
        });
    }

    renderHTML(){
        const user = this.props.user;
        
        if(user.userName){
            return /*html*/`
                <main>
                    <div class="logout">
                        <section id="logout-section">
                            <p>Signed in as ${user.userName}<p>
                            <div id="buttons">
                                <button id="logout-button">Logout</button>
                                <button id="toPages">To My Pages</button>
                            </div>
                        </section>
                    </div>
                    <div class="opaqueness"></div>
                </main>
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
