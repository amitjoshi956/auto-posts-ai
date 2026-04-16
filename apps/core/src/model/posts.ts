import mongoose, { Schema } from 'mongoose';

export type PostDocument = {
  _id: mongoose.Types.ObjectId;
  title: string;
  article: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const PostSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model<PostDocument>('Post', PostSchema);
export default PostModel;
