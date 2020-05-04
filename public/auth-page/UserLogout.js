import Component from '../Component.js';

class UserLogout extends Component {
    onRender(dom) {
        const logoutButton = dom.querySelector('#logout-button');
        logoutButton.addEventListener('click', () => {
            fetch('/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if(res.ok) {
                        window.location = './auth.html';
                        return res;
                    }
                    throw `Response: ${res.status}`;
                });
        });

        const toPages = dom.querySelector('#toPages');
        toPages.addEventListener('click', () => {
            window.location.href = '../my-pages.html';
        });
    }

    renderHTML() {
        const user = this.props.user;
        
        return /*html*/`
            <div class="auth-box">
                <p>Signed in as <em>${user.userName}</em><p>
                <div id="buttons">
                    <button id="logout-button">Logout</button>
                    <button id="toPages">To My Pages</button>
                </div>
            </div>
        `;
    }
}

export default UserLogout;
