import MyPagesApp from './MyPagesApp.js';

const fetchActiveUser = async() => {
    const userObj = await fetch('/api/v1/auth/verify');
    return await userObj.json();
};

fetchActiveUser()
    .then(user => {
        if(!user._id) {
            window.location.href = '../auth.html';
        }

        const app = new MyPagesApp({ user });
        document.body.prepend(app.renderDOM());
    });
