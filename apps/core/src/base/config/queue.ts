import {
  type Queue,
  Queues,
  connectToRedis,
  createQueue,
  QueueDefaults,
  QueuePrefixes,
} from '@autoposts/shared';
import { env } from './env';

const redis = connectToRedis(env.redisUrl);

export const postEngineQueue: Queue = createQueue(
  Queues.PostEngine,
  redis,
  {
    attempts: QueueDefaults.MAX_ATTEMPTS,
    backoff: { type: QueueDefaults.BACKOFF_TYPE, delay: QueueDefaults.BACKOFF_DELAY_MS },
    removeOnComplete: QueueDefaults.REMOVE_ON_COMPLETE,
    removeOnFail: QueueDefaults.REMOVE_ON_FAIL,
  },
  QueuePrefixes.PostEngine
);
