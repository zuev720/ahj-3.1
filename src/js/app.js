import Main from './Main';
import Controller from './Controller';

const controller = new Controller();

controller.init(new Main(document.querySelector('.container')));
