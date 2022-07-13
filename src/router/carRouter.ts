import { Router } from 'express';
import car from '../modules/car';

const router = Router();

router.post('/', car.create)
  .get('/', car.getAll)
  .get('/:id', car.getOne);

export default router;