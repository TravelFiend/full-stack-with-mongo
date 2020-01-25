import AuthPageApp from './AuthPageApp.js';

const app = new AuthPageApp({ user: null });

const fetchActiveUser = async() => {
    const userObj = await fetch('/api/v1/auth/verify');
    const user = await userObj.json();
    app.update({ user });
};

document.body.prepend(app.renderDOM());
fetchActiveUser();
