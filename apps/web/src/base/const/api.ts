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

export const ApiRoutes = {
  Base: '/',
  Auth: {
    Login: '/auth/login',
    Signup: '/auth/signup',
    Logout: '/auth/logout',
  },
  Topics: {
    Base: '/topics',
    ById: (id: string) => `/topics/${id}`,
  },
  Posts: {
    Base: '/posts',
    Latest: '/posts/latest',
    ById: (id: string) => `/posts/${id}`,
    ByTopic: (topicId: string) => `/posts/topic/${topicId}`,
  },
} as const;
