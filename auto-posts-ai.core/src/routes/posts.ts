import { Router } from 'express';
import { Post, PostContent, Req, Res } from '@base/types';
import { PostErrors } from '@base/const';
import Posts from '@model/posts.js';
import { auth } from '@middleware/auth';

const router = Router();
router.get('/', async (req: Req<never>, res: Res<Post[]>) => {
  try {
    const posts: Post[] = await Posts.find({});
    res.json({ data: posts });
  } catch (error) {
    res.status(500).json({ error: PostErrors.FETCH_FAILED });
  }
});

router.get('/:id', async (req: Req<never>, res: Res<Post>) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id);
    if (!post) {
      res.status(404).json({ hasErrors: true, error: PostErrors.NOT_FOUND });
      return;
    }

    res.json({ data: post });
  } catch (error) {
    res.status(500).json({ error: PostErrors.FETCH_FAILED });
  }
});

router.post('/', auth, async (req: Req<PostContent>, res: Res<Post>) => {
  const { title, article } = req.body;
  try {
    const post = await Posts.create({ title, article });
    res.status(201).json({
      data: post,
    });
  } catch (error) {
    res.status(500).json({ error: PostErrors.CREATE_FAILED });
  }
});

router.put('/:id', auth, async (req: Req<PostContent>, res: Res<Post>) => {
  try {
    const { id } = req.params;
    const { title, article } = req.body;
    const post = await Posts.findByIdAndUpdate(id, { title, article }, { new: true });

    if (!post) {
      res.status(404).json({ error: PostErrors.NOT_FOUND });
      return;
    }
    res.json({
      data: post,
    });
  } catch (error) {
    res.status(500).json({ error: PostErrors.UPDATE_FAILED });
  }
});

export default router;
