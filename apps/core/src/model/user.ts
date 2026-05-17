import mongoose, { Schema } from 'mongoose';
import { EmailRegex, ErrorMessages, UserRole, type BasePermission } from '@autoposts/shared';

export type UserDocument = {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  permissions: BasePermission[];
  preferences: {
    generationFrequency: {
      enabled: boolean;
      cron: string | null;
      timezone: string;
    };
  };
} & mongoose.Document;

const UserSchema = new Schema<UserDocument>({
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
    // Note: hashed passwords won't match PasswordRegex — validation happens before hashing at route level
  },
  permissions: {
    type: [String],
    default: UserRole.GUEST_USER,
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
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);
export default UserModel;
