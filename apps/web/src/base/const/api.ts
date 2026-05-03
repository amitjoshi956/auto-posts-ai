import { Time } from '@autoposts/shared';

export const QueryCacheKey = {
  UserProfile: 'userProfile',
  Posts: 'posts',
  GeneratedPost: 'generatedPost',
  Topics: 'topics',
};

export const QueryCacheTime = {
  ProfileStale: Time.mins(10),
  ProfileGc: Time.Forever,
};
