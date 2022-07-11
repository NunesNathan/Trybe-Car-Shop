import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const carSchema = VehicleSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).gte(2, { message: 'doorsQty must be 2 or more' })
    .lte(4, { message: 'doorsQty must be 4 or less' }),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).gte(2, { message: 'seatsQty must be 2 or more' })
    .lte(7, { message: 'seatsQty must be 4 or less' }),
});

export type Car = z.infer<typeof carSchema>;
