import Component from '../Component.js';

class UserLogin extends Component {
    onRender(form){
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(event.target);
            
            const user = {
                email: formData.get('login-email'),
                password: formData.get('login-password')
            };

            fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
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
                        <label for="login-email">Email:</label>
                        <input class="user-input" id="login-email" name="login-email" type="email"/>

                        <label for="login-password">Password:</label>
                        <input class="user-input" id="login-password" name="login-password" type="password"/>

                    <button class="auth-button">Login</button>
                </form>
            </div>
        `;
    }
}

export default UserLogin;
