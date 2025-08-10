import { Document } from 'mongoose';

export type Post = Document & {
  title: string;
  article: string;
};
