import carController from './carUseCases';

const car = {
  create: carController.create.bind(carController),
};

export default car;