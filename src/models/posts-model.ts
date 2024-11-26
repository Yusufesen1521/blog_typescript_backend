import { Schema, model, Document, Types } from 'mongoose';

interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  createdBy: string;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PostsSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: Types.ObjectId },
  },
  { timestamps: true }
);

const PostModel = model<IPost>('post', PostsSchema);

export default PostModel;