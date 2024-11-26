import rateLimit from 'express-rate-limit';

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP, please try again later.',
});

export { limit };