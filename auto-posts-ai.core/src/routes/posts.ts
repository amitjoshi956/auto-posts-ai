import { Router } from 'express';
import Post from '@model/posts.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.post('/', async (req, res) => {
  const { title, article } = req.body;
  try {
    const post = await Post.create({ title, article });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, article } = req.body;
    const post = await Post.findByIdAndUpdate(id, { title, article }, { new: true });

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

export default router;
