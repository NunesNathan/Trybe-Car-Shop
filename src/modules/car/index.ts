import carController from './carUseCases';

const car = {
  create: carController.create.bind(carController),
  getAll: carController.read.bind(carController),
};

export default car;