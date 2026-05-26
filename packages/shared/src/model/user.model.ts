import mongoose, { Schema } from 'mongoose';
import { EmailRegex, ErrorMessages } from '../constants';
import { UserRole } from '../enums';

export type UserDocument = {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  permissions: string[];
  preferences: {
    generationFrequency: {
      enabled: boolean;
      cron: string | null;
      timezone: string;
    };
  };
} & mongoose.Document;

const UserSchema = new Schema<UserDocument>(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => EmailRegex.test(value),
        message: ErrorMessages.INVALID_EMAIL,
      },
    },
    password: {
      type: String,
      required: true,
    },
    permissions: {
      type: [String],
      default: () => [UserRole.GUEST_USER[0]],
    },
    preferences: {
      type: {
        generationFrequency: {
          enabled: { type: Boolean, default: false },
          cron: { type: String, default: null },
          timezone: { type: String, default: 'UTC' },
        },
      },
      default: () => ({
        generationFrequency: { enabled: false, cron: null, timezone: 'UTC' },
      }),
    }, 
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
