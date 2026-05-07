import { FC } from 'react';
import { TopicStatus } from '@autoposts/shared';
import type { Topic } from '@autoposts/shared';
import { CalenderIcon } from '@assets/icons';
import { Icon } from '@components/base';

import './TopicCard.scss';

type TopicCardProps = {
  topic: Topic;
};

const statusLabels: Record<TopicStatus, string> = {
  [TopicStatus.DRAFT]: 'Draft',
  [TopicStatus.THINKING]: 'Thinking',
  [TopicStatus.ARCHIVED]: 'Archived',
  [TopicStatus.PUBLISHED]: 'Published',
};

const formatDateTime = (value: string | Date | null): string => {
  if (!value) return '—';
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const TopicCard: FC<TopicCardProps> = ({ topic }) => {
  const { title, plan, generationDateTime, status } = topic;
  const statusClass = `topic-card__status--${status}`;

  return (
    <article className="topic-card">
      <div className="topic-card__header">
        <h3 className="topic-card__title">{title}</h3>
        <span className={`topic-card__status ${statusClass}`}>{statusLabels[status]}</span>
      </div>

      {plan && <p className="topic-card__plan">{plan}</p>}

      <div className="topic-card__meta">
        <Icon icon={CalenderIcon} size="xs" />
        <span className="topic-card__date">{formatDateTime(generationDateTime)}</span>
      </div>
    </article>
  );
};

export default TopicCard;
