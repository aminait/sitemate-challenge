import express from 'express';
import v1Routes from './v1';

const router = express();

router.get('/health', (_req, res) => {
  res.send('Healthy Server!');
});

// Version 1 Routes
router.use('/v1', v1Routes());

export default router;
