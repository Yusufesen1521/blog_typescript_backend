import dotenv from 'dotenv';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtSecret: string = process.env.JWT_SECRET || '';

interface DecodedToken {
  userId: string;
}


const authenticate: RequestHandler = (req, res,next): any => {
  // Get token from header Authorization bearer token
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token ) {
    
    return res.status(403).json({ success: false, message: 'No token provided!' });
  } 
  if(token == '') {
  
    return   res.status(403).json({ success: false, message: 'No token provided!' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    req.body.userId = decoded.userId;
return next();
  } catch (err) {
   
    console.log(err);
    return  res.status(401).json({ success: false, message: 'Unauthorized!' })
  }
};

export { authenticate };