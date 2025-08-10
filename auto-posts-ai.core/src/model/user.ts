import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import { User } from '@base/types';
import { EMAIL_REGEX, PASSWORD_REGEX, ErrorMessages, UserRole } from '@base/const';

const UserSchema: Schema = new Schema({
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
      validator: function (value: string) {
        const match = value.match(EMAIL_REGEX);
        return match != null && match.length > 0;
      },
      message: ErrorMessages.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64,
    validate: {
      validator: function (value: string) {
        return value.match(PASSWORD_REGEX) != null;
      },
      message: ErrorMessages.INVALID_PASSWORD,
    },
  },
  permissions: {
    type: [String],
    default: UserRole.GUEST_USER,
  },
});

UserSchema.methods.generateAuthToken = function (): string {
  const JwtSecret = process.env.JWT_SECRET || '';
  return jwt.sign({ _id: this._id, email: this.email }, JwtSecret);
};

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
