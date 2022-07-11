import { model, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import GenericModel from './GenericModel';
import { CarDocument } from './schemas/carSchema';

export const carSchema = new Schema<CarDocument>({
  model: {
    type: String,
    required: true,
    minlength: 3,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2022,
  },
  color: {
    type: String,
    required: true,
    minlength: 3,
  },
  status: {
    type: Boolean,
    required: false,
  },
  buyValue: {
    type: Number,
    required: true,
  },
  doorsQty: {
    type: Number,
    required: true,
    min: 2,
    max: 4,
  },
  seatsQty: {
    type: Number,
    required: true,
    min: 2,
    max: 7,
  },
});

export default class CarModel extends GenericModel<Car> {
  constructor(_model = model<Car>('Car', carSchema)) {
    super(_model);
  }
}
