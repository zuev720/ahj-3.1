import Main from '../Main';

test('Должен успешно создаваться экземпляр класса', () => {
  const main = new Main(document.querySelector('.container'));
  expect(main.container).toBe(null);
  expect(main.borderEl).toBe(null);
  expect(main.boardSize).toBe(4);
  expect(main.cells.length).toBe(0);
  expect(main.points).toBe(0);
  expect(main.losePoints).toBe(0);
});
