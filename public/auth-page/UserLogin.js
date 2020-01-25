import Component from '../Component.js';

class UserLogin extends Component {
    onRender(form){
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(event.target);
            
            const user = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(user => {
                    if(user._id){
                        window.location.href = '../my-pages.html';
                    }
                    const error = document.createElement('div');
                    error.textContent = 'Incorrect email or password';
                    form.appendChild(error);
                    if(form.children.length > 2) form.removeChild(form.lastChild);
                });
        });
    }

    renderHTML(){
        return /*html*/`
            <div>
                <form id="login-form">
                    <div>
                        <label for="login-email">Email:<label>
                        <input class="user-input" id="login-email" name="login-email" type="email"/>
                    </div>

                    <div>
                        <label for="login-password">Password:<label>
                        <input class="user-input" id="login-password" name="login-password" type="password"/>
                    </div>

                    <button class="auth-button">Login</button>
                </form>
            </div>
        `;
    }
}

export default UserLogin;
