import express from 'express';
import verifyController from '../controllers/verifyController.js';

const router = express.Router();

router.get('/token', verifyController.verifyToken);
router.get('/getToken', verifyController.getToken);
router.post('/removeToken', verifyController.removeToken);

export default router;