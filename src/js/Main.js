import EventBus from './EventBus';

export default class Main {
  constructor(element) {
    this.container = element;
    this.borderEl = null;
    this.boardSize = 4;
    this.cells = [];
    this.cellClickListeners = [];
    this.buttonClickListeners = [];
    this.points = 0;
    this.losePoints = 0;
    EventBus.subscribe('points', this.setPoints.bind(this));
    EventBus.subscribe('losePoints', this.setLosePoints.bind(this));
  }

  drawUi() {
    this.container.innerHTML = `
      <div class="board-container">
          <p class="points">Всего набрано очков: <span class="value-points"></span></p>
          <p class="lose-points">Потеряно очков: <span class="value-loose-points"></span></p>
          <div class="lose-inform">
              <p class="lose-inform-text">Вы проиграли!</p>
              <button class="btn">Новая игра</button>
          </div>
          <div class="board"></div>
      </div>
    `;
    this.container.querySelector('.value-points').textContent = this.points.toString();
    this.container.querySelector('.value-loose-points').textContent = this.losePoints.toString();
    this.borderEl = this.container.querySelector('.board');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      this.borderEl.appendChild(cellEl);

      cellEl.addEventListener('mousedown', (event) => this.onCellClick(event));
      cellEl.addEventListener('mouseenter', (event) => Main.onCellEnter(event));
      cellEl.addEventListener('mouseleave', (event) => Main.onCellLeave(event));
    }

    this.cells = [...this.borderEl.children];

    if (this.losePoints >= 5) {
      this.container.querySelector('.lose-inform').style.display = 'flex';
      EventBus.publish('stopGame', {
        stopGame: true,
      });
      this.container.querySelector('.btn').addEventListener('click', (event) => this.onButtonClick(event));
    }
  }

  setPoints(point) {
    this.points = point.currentPoints;
  }

  setLosePoints(point) {
    this.losePoints = point.currentLosePoints;
  }

  redrawPositions(position) {
    for (const cell of this.cells) {
      cell.classList.remove('.goblin');
    }

    const cellEl = this.borderEl.children[position];
    const goblinEl = document.createElement('div');
    goblinEl.classList.add('goblin');
    cellEl.appendChild(goblinEl);
  }

  clickCellListeners(fn) {
    this.cellClickListeners.push(fn);
  }

  clickButtonListeners(fn) {
    this.buttonClickListeners.push(fn);
  }

  onCellClick(event) {
    event.preventDefault();
    this.cellClickListeners.forEach((o) => o(event));
  }

  onButtonClick(event) {
    event.preventDefault();
    this.buttonClickListeners.forEach((o) => o(event, this));
  }

  static onCellEnter(event) {
    event.preventDefault();
    const activeCell = event.currentTarget;
    activeCell.classList.add('activeCell');
  }

  static onCellLeave(event) {
    event.preventDefault();
    const activeCell = event.currentTarget;
    activeCell.classList.remove('activeCell');
  }
}
