import { FC, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { NoteAddIcon, StickyNote01Icon } from '@hugeicons/core-free-icons';
import { useTopics } from '@api/topic/query';
import { Button, Loader } from '@components/base';
import { TopicCard, AddTopicModal } from '@components/.';

import './Topics.scss';

const Topics: FC = () => {
  const { data: topics, isLoading } = useTopics();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <Loader message="Loading topics" />;
  }

  const hasTopics = topics && topics.length > 0;

  return (
    <div className="topics">
      <div className="topics__header">
        <h2 className="topics__title">Topics</h2>
        <Button variant="filled" size="sm" onClick={() => setIsModalOpen(true)}>
          <HugeiconsIcon icon={NoteAddIcon} size={18} />
          Add Topic
        </Button>
      </div>

      {hasTopics ? (
        <ul className="topics__list">
          {topics.map((topic) => (
            <li key={topic._id} className="topics__list-item">
              <TopicCard topic={topic} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="topics__empty">
          <HugeiconsIcon className="topics__empty-icon" icon={StickyNote01Icon} size={56} />
          <p className="topics__empty-text">
            No topics planned yet. Create your first one to get started!
          </p>
        </div>
      )}

      <AddTopicModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Topics;
