import type { Topic, TopicPayload, UpdateTopicPayload } from '@autoposts/shared';
import apiClient from '@base/config/axios';

export const getTopics = (): Promise<Topic[]> => {
  return apiClient.get('/topics');
};

export const createTopic = (payload: TopicPayload): Promise<Topic> => {
  return apiClient.post('/topics', payload);
};

export const updateTopic = (id: string, payload: UpdateTopicPayload): Promise<Topic> => {
  return apiClient.put(`/topics/${id}`, payload);
};

export const deleteTopic = (id: string): Promise<{ message: string }> => {
  return apiClient.delete(`/topics/${id}`);
};
