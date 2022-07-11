import { Document } from 'mongoose';
import { Car } from '../../interfaces/CarInterface';

export interface CarDocument extends Car, Document { }
