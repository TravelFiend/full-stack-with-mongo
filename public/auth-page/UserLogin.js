import Component from '../Component.js';

class UserLogin extends Component {
    onRender(form){
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(event.target);
            
            const user = {
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
                        <label for="email">Email:<label>
                        <input class="user-input" id="email" name="email" type="email"/>
                    </div>

                    <div>
                        <label for="password">Password:<label>
                        <input class="user-input" id="password" name="password" type="password"/>
                    </div>

                    <button class="auth-button">Login</button>
                </form>
            </div>
        `;
    }
}

module.exports = UserLogin;
