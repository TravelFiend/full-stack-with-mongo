import AuthPageApp from './AuthPageApp.js';

const app = new AuthPageApp({ user: null });
document.body.prepend(app.renderDOM());
