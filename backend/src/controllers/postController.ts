import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as postService from '../services/postService';

// @desc Get posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await postService.getPosts();
  res.json(posts);
});

// @desc Create a post
// @route POST /api/posts
// @access Private
const createPost = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { content } = req.body;
  if (!content || typeof content !== 'string') {
    res.status(400);
    throw new Error('Content is required');
  }
  const post = await postService.createPost(userId, content);
  res.status(201).json(post);
});

export { getPosts, createPost };
