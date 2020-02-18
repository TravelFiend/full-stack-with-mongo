import AuthPageApp from './AuthPageApp.js';

const fetchActiveUser = async() => {
    const userObj = await fetch('/api/v1/auth/verify');
    return await userObj.json();
};

fetchActiveUser()
    .then(user => {
        const app = new AuthPageApp({ user });
        document.body.prepend(app.renderDOM());
    });
