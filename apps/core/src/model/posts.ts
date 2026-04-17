import mongoose, { Schema } from 'mongoose';

export type PostDocument = {
  _id: mongoose.Types.ObjectId;
  title: string;
  article: string;
  userId: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const PostSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    // Stored for future topic→posts linking, omitted from API responses for now
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', default: null },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model<PostDocument>('Post', PostSchema);
export default PostModel;
