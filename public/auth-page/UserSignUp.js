import Component from '../Component.js';

class UserSignUp extends Component {
    renderHTML(){
        return /*html*/`
            <form id="sign-up-form">
                <div>
                    <label for="name"><label>
                    <input class="user-input" id="name" name="name" placeholder="Your Name" />
                </div>

                <div>
                    <label for="email"><label>
                    <input class="user-input" id="email" name="email" type="email" placeholder="Email"/>
                </div>

                <div>
                    <label for="password"><label>
                    <input class="user-input" id="password" name="password" type="password" placeholder="Password"/>
                </div>

                <button class="auth-button">Create Account</button>
                <button class="auth-button">Already have an account?</button>
            </form>
        `;
    }
}

export default UserSignUp;
