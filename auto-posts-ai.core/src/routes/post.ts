import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    id: 1,
    title: 'Generated Post Title',
    content: 'This is a generated post',
  });
});

export default router;
