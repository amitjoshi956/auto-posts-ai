import mongoose, { Schema } from 'mongoose';

export type PostDocument = {
  _id: mongoose.Types.ObjectId;
  title: string;
  article: string;
  tags: string[];
  userId: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const PostSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    tags: { type: [String], default: [] },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient topic-scoped queries per user
PostSchema.index({ userId: 1, topicId: 1 });

const PostModel = mongoose.model<PostDocument>('Post', PostSchema);
export default PostModel;
