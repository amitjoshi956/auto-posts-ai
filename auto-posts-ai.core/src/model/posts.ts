import { Schema, model } from 'mongoose';
import { Post } from '@base/types';

const PostSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PostModel = model<Post>('Post', PostSchema);
export default PostModel;
