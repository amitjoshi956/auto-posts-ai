import apiClient from '@base/config/axios';
import type { Topic, CreateTopicPayload } from '@autoposts/shared';

export const getTopics = (): Promise<Topic[]> => {
  return apiClient.get('/topics');
};

export const createTopic = (payload: CreateTopicPayload): Promise<Topic> => {
  return apiClient.post('/topics', payload);
};
