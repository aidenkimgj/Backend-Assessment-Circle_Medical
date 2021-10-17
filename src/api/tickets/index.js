import express from 'express';
import ctrl from './tickets.ctrl';

const router = express.Router();

router.post('/', ctrl.create);

export default router;
