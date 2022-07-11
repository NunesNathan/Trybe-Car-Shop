import { Car, carSchema } from '../interfaces/CarInterface';
import GenericService from './GenericService';
import CarModel from '../models/CarModel';

export default class CarService extends GenericService<Car> {
  constructor(protected model: CarModel) {
    super(model, carSchema);
  }
}