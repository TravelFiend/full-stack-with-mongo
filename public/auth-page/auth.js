import AuthPageApp from './AuthPageApp.js';

const app = new AuthPageApp({ user: null });

const fetchActiveUser = async() => {
    const user = await fetch('/api/v1/auth/verify');
    app.update({ user });
};

fetchActiveUser();
document.body.prepend(app.renderDOM());
