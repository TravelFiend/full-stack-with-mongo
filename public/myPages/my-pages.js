import MyPagesApp from './MyPagesApp.js';

const app = new MyPagesApp({ user: null });

const fetchActiveUser = async() => {
    const userObj = await fetch('/api/v1/auth/verify');
    const user = await userObj.json();
    app.update({ user });
};

fetchActiveUser();

document.body.prepend(app.renderDOM());
