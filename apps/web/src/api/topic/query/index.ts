import { qClient } from '@api/client';
import type { Topic, TopicPayload, UpdateTopicPayload } from '@autoposts/shared';
import { createQuery, createMutation } from '@common/utils/query';
import { getTopics, createTopic, updateTopic, deleteTopic } from '@api/topic/topic-service';
import { QueryCacheKey } from '@base/const';

export const useTopics = createQuery<Topic[]>([QueryCacheKey.Topics], getTopics, { retry: false });

export const useCreateTopic = createMutation<Topic, TopicPayload>(
  (payload) => createTopic(payload),
  {
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: [QueryCacheKey.Topics] });
    },
  }
);

export const useUpdateTopic = createMutation<Topic, { id: string; payload: UpdateTopicPayload }>(
  ({ id, payload }) => updateTopic(id, payload),
  {
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: [QueryCacheKey.Topics] });
    },
  }
);

export const useDeleteTopic = createMutation<{ message: string }, string>((id) => deleteTopic(id), {
  onSuccess: () => {
    qClient.invalidateQueries({ queryKey: [QueryCacheKey.Topics] });
  },
});
