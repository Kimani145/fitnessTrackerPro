import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as userService from '../services/userService';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userService.authUser(email, password);
    res.json(user);
  } catch (error: any) {
    res.status(401);
    throw new Error(error.message);
  }
});

export { registerUser, authUser };
