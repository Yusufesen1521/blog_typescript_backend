import { Request, Response } from 'express';
import PostModel from '../models/posts-model';
import { sanitizeInput } from '../utils/validator';
import { Types } from 'mongoose';
import UserModel from '../models/user-model';

interface CreatePostRequest extends Request {
  body: {
    userId: string;
    title?: string;
    content?: string;
  };
}

export const createPost = async (req: CreatePostRequest, res: Response): Promise<void> => {
  const { userId, title = '', content = '' } = req.body;

  try {
    if (!userId || !title || !content) {
       res.status(400).json({
        message: 'UserId, title, content are required fields.',
        status: 400,
      });
      return;
    }

    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(content);
    const user = await UserModel.findById(userId);

    const post = await PostModel.create({
      title: sanitizedTitle,
      content: sanitizedDescription,
      createdBy: userId,
      author: user?.username,
    });

     res.status(200).json({ 
      message: 'Post saved successfully!', 
      post,
      status: 200,
    },);
    return;
  } catch (error) {
     res.status(500).json({ 
      message: 'Internal Server Error',
      status: 500,
    });
    return;
  }
};

export const getAllPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await PostModel.find();
     res.status(200).json({
      message: 'Posts retrieved successfully!',
      data,
      status: 200,
     });
     return;
  } catch (error) {
     res.status(500).json({ 
      message: 'Internal Server Error',
      status: 500,
    });
    return;
  }
};

export const getSpecificPost = async (req: Request<{ postId: string }>, res: Response): Promise<void> => {
  const { postId = '' } = req.params;

  try {
    if (!postId) {
       res.status(400).json({ message: 'Post Id is required.', status: 400, });
       return;
    }

    const post = await PostModel.findById(postId);

    if (!post) {
       res.status(404).json({ 
         message: 'No post found',
         status: 404,
        });
        return;
    }

     res.status(200).json({
      message: 'Post retrieved successfully!',
      post,
      status: 200,
      });
      return;
  } catch (error) {
     res.status(500).json({ 
      message: 'Internal Server Error',
      status: 500, 
    });
    return;
  }
};

export const updatePost = async (
  req: Request<{ postId: string }, {}, {title?: string; content?: string;}>,
  res: Response
): Promise<void> => {
  const { title = '', content = ''} = req.body;
  const { postId } = req.params;
  
  try {
    if (!postId) {
       res.status(400).json({ 
        message: 'Post Id is required',
        status: 400,
      });
      return;
    }

    const post = await PostModel.findById(postId);

    if (!post) {
       res.status(404).json({ 
        message: 'No post found',
        status: 404,
      });
      return;
    }

    post!.title = title || post!.title;
    post!.content = content || post!.content;

    await PostModel.findByIdAndUpdate(postId, post!);

     res.status(200).json({
      message: 'Post updated successfully!',
      post,
      status: 200,
    });
    return;
  } catch (error) {
     res.status(500).json({ 
      message: 'Internal Server Error',
      status: 500,
    });
    return;
  }
};

export const deletePost = async (
  req: Request<{ postId: string }>, 
  res: Response
): Promise<void> => {
  const { postId } = req.params;

  try {
    if (!postId) {
       res.status(400).json({ 
        message: 'Post Id is required',
        status: 400,
      });
      return;
    }

    const post = await PostModel.findByIdAndDelete(postId);

    if (!post) {
       res.status(404).json({ 
        message: 'No post found',
        status: 404,
      });
      return;
    }

     res.status(200).json({ 
      message: 'Post deleted successfully.',
      status: 200, 
    });
    return;
  } catch (error) {
    console.error('Error deleting post:', error);
     res.status(500).json({ 
      message: 'Internal Server Error',
      status: 500,
    });
    return;
  }
};