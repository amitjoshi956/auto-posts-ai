import { Logger } from '@autoposts/shared';

const logger = new Logger('workers');

/** Placeholder — wire to real notification system later */
export async function notifyUser(userId: string, postId: string, reason: string): Promise<void> {
  logger.logWarning('User notification (placeholder)', {
    userId,
    postId,
    reason,
  });
}
