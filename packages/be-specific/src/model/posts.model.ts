import mongoose, { Schema } from 'mongoose';

export type PostDocument = {
  _id: mongoose.Types.ObjectId;
  title: string;
  article: string;
  plan: string;
  status: string;
  plannedFor: Date | null;
  tags: string[];
  userId: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const PostSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    article: { type: String, default: '' },
    plan: { type: String, default: '' },
    status: { type: String, default: 'draft', index: true },
    plannedFor: { type: Date, default: null, index: true },
    tags: { type: [String], default: [] },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  },
  { timestamps: true }
);

// Compound index for efficient topic-scoped queries per user
PostSchema.index({ userId: 1, topicId: 1 });

export const PostModel = mongoose.model('Post', PostSchema);
