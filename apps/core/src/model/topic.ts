import mongoose, { Schema } from 'mongoose';
import { TopicStatus, TopicDefaults } from '@autoposts/shared';

export type TopicDocument = {
  _id: mongoose.Types.ObjectId;
  title: string;
  plan?: string;
  generationDateTime: Date | null;
  status: TopicStatus;
  parentId: mongoose.Types.ObjectId | null;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const TopicSchema = new Schema<TopicDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      maxlength: TopicDefaults.PLAN_MAX_LENGTH,
    },
    // Nullable: cleared when status transitions to THINKING or ARCHIVED
    generationDateTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(TopicStatus),
      default: TopicStatus.DRAFT,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const TopicModel = mongoose.model<TopicDocument>('Topic', TopicSchema);
export default TopicModel;
