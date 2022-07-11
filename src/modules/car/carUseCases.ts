import CarModel from '../../models/CarModel';
import CarService from '../../services/carService';
import CarController from '../../controllers/CarController';

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

export default carController;