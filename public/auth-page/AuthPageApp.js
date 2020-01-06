import Component from '../Component.js';
// import UserSignIn from './UserSignIn.js';
// import UserSignUp from './UserSignUp.js';

class AuthPageApp extends Component {
    // onRender(dom){

    // }

    renderHTML(){
        let user;
        
        if(user){
            return /*html*/`
                <div class="container">
                    <section id="logout-section">
                        <p>Signed in as ${user}<p>
                        <div>
                            <button>To My Notes</button>
                            <button>Logout</button>
                        </div>
                    </section>
                <div>
            `;
        }
        return /*html*/`
            <div>
                <main class="container">
                    <div class="error"></div>
                    <section class="hidden" id="sign-up-spot">
                        <div class="toggle">
                            <button class="auth-button" id="to-sign-in">Already have an account?</button>
                        </div>
                    </section>

                    <section id="sign-in-spot">
                        <div class="toggle">
                            <button class="auth-button" id="to-sign-up">New User?</button>
                        </div>
                    </section>
                </main>
            </div>
        `;
    }
}

export default AuthPageApp;
