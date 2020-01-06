import App from './homeApp.js';
import Header from '../common/Header.js';

const app = new App();
const header = new Header();
document.body.prepend(header.renderDOM());
document.body.appendChild(app.renderDOM());
