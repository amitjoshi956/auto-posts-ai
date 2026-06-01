import mongoose, { Schema } from 'mongoose';
import { TopicDefaults } from '@autoposts/shared';

type Topic = {
  _id: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  color?: string;
  parentId: mongoose.Types.ObjectId | null;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const TopicSchema = new Schema<Topic>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: TopicDefaults.DESCRIPTION_MAX_LENGTH,
    },
    color: {
      type: String,
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

export const TopicModel = mongoose.model('Topic', TopicSchema);
