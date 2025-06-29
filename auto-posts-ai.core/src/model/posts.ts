import { Schema, model, Document } from 'mongoose';

export interface Post extends Document {
  title: string;
  article: string;
}

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
