import App from './HomeApp.js';
import Header from '../common/Header.js';

const app = new App();
const header = new Header();
document.body.appendChild(app.renderDOM());
document.body.prepend(header.renderDOM());
