import { Router } from 'express';
import car from '../modules/car';

const router = Router();

router.post('/', car.create);

export default router;