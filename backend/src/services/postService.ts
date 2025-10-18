import Post, { IPost } from '../models/postModel';
import { Types } from 'mongoose';

const createPost = async (userId: string, content: string) => {
  const post = new Post({ user: userId, content });
  return await post.save();
};

const getPosts = async (limit = 50) => {
  return await Post.find().sort({ createdAt: -1 }).limit(limit).populate('user', 'name').exec();
};

export { createPost, getPosts };
