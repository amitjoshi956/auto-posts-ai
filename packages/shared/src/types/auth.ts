import { z } from 'zod';
import { LoginSchema, SignupSchema } from '../schemas/user.schema';

export type LoginPayload = z.infer<typeof LoginSchema>;

export type SignupPayload = z.infer<typeof SignupSchema>;
