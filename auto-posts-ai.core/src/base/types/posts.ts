import { Document } from 'mongoose';

export type PostContent = {
  title: string;
  article: string;
};

export type Post = Document & PostContent;
