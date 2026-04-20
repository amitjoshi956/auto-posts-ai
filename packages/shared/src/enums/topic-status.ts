export enum TopicStatus {
  DRAFT = 'draft',
  THINKING = 'thinking',
  ARCHIVED = 'archived',
  PUBLISHED = 'published', // system-set only — not exposed via UpdateTopicSchema
}

// Statuses a user is allowed to set manually via PUT /topics/:id.
// Excludes PUBLISHED — used in UpdateTopicSchema to stay coupled with the enum.
export const UserSettableTopicStatuses = [
  TopicStatus.DRAFT,
  TopicStatus.THINKING,
  TopicStatus.ARCHIVED,
] as const;
