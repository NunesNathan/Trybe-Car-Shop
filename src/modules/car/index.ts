import carController from './carUseCases';

const car = {
  create: carController.create.bind(carController),
  getAll: carController.read.bind(carController),
  getOne: carController.readOne.bind(carController),
  update: carController.update.bind(carController),
};

export default car;