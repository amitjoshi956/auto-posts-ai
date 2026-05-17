import mongoose, { Schema, InferSchemaType } from 'mongoose';

const PostSchema = new Schema(
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
  {
    timestamps: true,
  }
);

// Compound index for efficient topic-scoped queries per user
PostSchema.index({ userId: 1, topicId: 1 });

// TODO: Why is this type created? Who will use it? And why not using the shared type created from zod schema?
export type PostDocument = InferSchemaType<typeof PostSchema> & {
  _id: mongoose.Types.ObjectId;
};

const PostModel = mongoose.model('Post', PostSchema);
export default PostModel;
