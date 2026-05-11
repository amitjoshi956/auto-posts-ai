import mongoose, { Schema } from 'mongoose';
import { TopicDefaults } from '@autoposts/shared';

export type TopicDocument = {
  _id: mongoose.Types.ObjectId;
  title: string;
  description?: string;
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
    description: {
      type: String,
      maxlength: TopicDefaults.DESCRIPTION_MAX_LENGTH,
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
