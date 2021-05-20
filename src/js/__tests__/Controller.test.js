import Main from '../Main';
import Controller from '../Controller';

test('Должен успешно создаваться экземпляр класса', () => {
  const main = new Main(document.querySelector('.container'));
  const controller = new Controller();
  controller.init(main);
  expect(controller.points).toBe(0);
  expect(controller.losePoints).toBe(0);
  expect(controller.counter).toBe(3);
});
