import AuthPageApp from './AuthPageApp.js';
import Header from '../common/Header.js';

const app = new AuthPageApp();
const header = new Header();
document.body.prepend(header.renderDOM());
document.body.appendChild(app.renderDOM());
