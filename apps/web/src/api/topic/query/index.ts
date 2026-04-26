import { qClient } from '@api/client';
import { getTopics, createTopic } from '@api/topic/topic-service';
import { createQuery, createMutation } from '@common/utils/query';
import { QueryCacheKey } from '@base/const';
import type { Topic, CreateTopicPayload } from '@base/type';

export const useTopics = createQuery<Topic[]>(
  [QueryCacheKey.Topics],
  getTopics,
  { retry: false }
);

export const useCreateTopic = createMutation<Topic, CreateTopicPayload>(
  (payload) => createTopic(payload),
  {
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: [QueryCacheKey.Topics] });
    },
  }
);
