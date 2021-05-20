import EventBus from './EventBus';
import Main from './Main';

export default class Controller {
  constructor() {
    this.points = 0;
    this.losePoints = 0;
    EventBus.subscribe('stopGame', this.stopGame.bind(this));
  }

  init(main) {
    this.board = main;
    this.counter = setInterval(() => {
      this.board.drawUi();
      this.board.redrawPositions(Math.trunc(Math.random() * this.board.cells.length));
    }, 1000);

    this.board.clickCellListeners(this.onCellClick.bind(this));
    this.board.clickButtonListeners(this.onButtonClick.bind(this));
  }

  onCellClick(event) {
    if (event.target.classList.contains('goblin')) {
      this.points += 1;
      EventBus.publish('points', {
        currentPoints: this.points,
      });
    } else {
      this.losePoints += 1;
      EventBus.publish('losePoints', {
        currentLosePoints: this.losePoints,
      });
    }
  }

  stopGame(message) {
    if (message.stopGame === true) {
      clearInterval(this.counter);
      this.points = 0;
      this.losePoints = 0;
    }
  }

  onButtonClick() {
    this.init(new Main(document.querySelector('.container')));
  }
}
