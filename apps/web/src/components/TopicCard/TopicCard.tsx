import { FC } from 'react';
import type { Topic } from '@autoposts/shared';

import './TopicCard.scss';

type TopicCardProps = {
  topic: Topic;
};

const TopicCard: FC<TopicCardProps> = ({ topic }) => {
  const { title, description } = topic;

  return (
    <article className="topic-card">
      <h3 className="topic-card__title">{title}</h3>
      {description && <p className="topic-card__description">{description}</p>}
    </article>
  );
};

export default TopicCard;
