import { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user-model';
import { validateUserInput, sanitizeInput } from '../utils/validator';

dotenv.config();

const DUPLICATE_ERROR_CODE = 11000;
const JWT_SECRET = process.env.JWT_SECRET || '';

interface RegistrationRequest extends Request {
  body: {
    username?: string;
    email?: string;
    password?: string;
  };
}

interface LoginRequest extends Request {
  body: {
    username?: string;
    password?: string;
  };
}

export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json({
        message: 'User not found',
        status: 404,
      });
      return;
    }

    res.status(200).json({
      message: 'User details successfully retrieved.',
      user,
      status: 200,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      message: 'Internal server error!',
      status: 500,
    });
    return;
  }
};

export const registration = async (req: RegistrationRequest, res: Response): Promise<void> => {
  const { username = '', email = '', password = ''} = req.body;

  try {
    const validationErrors = validateUserInput(username, email, password);

    if (Object.keys(validationErrors).length > 0) {
       res.status(400).json({
        message: validationErrors,
        status: 400,
      });
      return;
    }

    const sanitizedUsername = sanitizeInput(username);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await UserModel.create({
      username: sanitizedUsername,
      email,
      password: hash,
    });

     res.status(200).json({ 
      message: 'Users successfully registered.',
      status: 200,
    });
    return;
  } catch (error: any) {
    if (error.code === DUPLICATE_ERROR_CODE) {
       res.status(400).json({
        message: `${Object.keys(error.keyPattern)[0]} already exists.`,
        status: 400,
      });
      return;
    }

     res.status(500).json({
      message: 'Failed to register, Internal Server Error',
      status: 500,
    });
    return;
  }
};

export const login = async (req: LoginRequest, res: Response): Promise<void> => {
  const { username = '', password = '' } = req.body;

  try {
    if (!username || !password) {
       res.status(400).json({
        message: 'Username and password are required.',
        status: 400,
      });
      return;
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
       res.status(404).json({ 
        message: 'Invalid Username',
        status: 404,
      });
      return;
    }

    const isValidPassword = bcrypt.compareSync(password, user!.password);
    
    if (!isValidPassword) {
       res.status(404).json({ 
        message: 'Invalid Password',
        status: 404,
      });
      return;
    }

    const token = jwt.sign(
      { userId: user!._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    user!.token = token;

     res.status(200).json({
      message: 'Login Successful!',
      user: user,
      status: 200,
    });
    return;
  } catch (error: any) {
     res.status(500).json({
      message: error.message,
      status: 500,
    });
    return;
  }
};