import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

const uri: string = process.env.MONGODB_URI || '';

const connection = connect(uri, {
  socketTimeoutMS: 30000,
});

export default connection;