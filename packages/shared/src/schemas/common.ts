import { z } from 'zod';
import { EmailRegex, PasswordRegex } from '../constants';
import { ErrorMessages } from '../constants/errors';

export const EmailSchema = z.string().regex(EmailRegex, 'Invalid email format');

export const PasswordSchema = z.string().regex(PasswordRegex, ErrorMessages.INVALID_PASSWORD);
