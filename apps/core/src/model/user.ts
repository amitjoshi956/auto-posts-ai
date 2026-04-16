import mongoose, { Schema } from 'mongoose';
import { EMAIL_REGEX, ErrorMessages, UserRole } from '@autoposts/shared';
import type { BasePermission } from '@autoposts/shared';

export type UserDocument = {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  permissions: BasePermission[];
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
      validator: (value: string) => EMAIL_REGEX.test(value),
      message: ErrorMessages.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    // Note: hashed passwords won't match PASSWORD_REGEX — validation happens before hashing at route level
  },
  permissions: {
    type: [String],
    default: UserRole.GUEST_USER,
  },
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);
export default UserModel;
