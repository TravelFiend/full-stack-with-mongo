import MyPagesApp from './MyPagesApp.js';

const fetchActiveUser = async() => {
    const userObj = await fetch('/api/v1/auth/verify');
    return await userObj.json();
};

fetchActiveUser()
    .then(user => {
        console.log(user);

        const app = new MyPagesApp({ user });
        document.body.prepend(app.renderDOM());
    });
