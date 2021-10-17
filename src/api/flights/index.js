import express from 'express';
import ctrl from './flights.ctrl';
import flights from '../../libs/flights.data';

const router = express.Router();

router.get('/', ctrl.show);

export default router;
