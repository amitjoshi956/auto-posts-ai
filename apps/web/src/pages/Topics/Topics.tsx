import { FC, useState } from 'react';
import { useTopics } from '@api/topic/query';
import { NoteAddIcon, StickyNoteIcon } from '@assets/icons';
import { Button, Loader, Message } from '@components/base';
import { TopicCard, AddTopicModal } from '@components/.';

import './Topics.scss';
import { useDevice } from '@common/hooks';

const Topics: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isTablet, isMobile } = useDevice();

  const { data: topics, isLoading } = useTopics();

  const addBtnVariant = isMobile || isTablet ? 'icon' : 'filled';
  const addBtnSize = isMobile || isTablet ? 'lg' : 'sm';
  const addIconSize = isMobile || isTablet ? 'md' : 'base';

  if (isLoading) {
    return <Loader message="Loading topics" />;
  }

  const hasTopics = topics && topics.length > 0;

  const AddButton = () => (
    <Button
      variant={addBtnVariant}
      size={addBtnSize}
      className="topics__add-btn"
      icon={NoteAddIcon}
      iconSize={addIconSize}
      label="Add Topic"
      onClick={() => setIsModalOpen(true)}
    />
  );

  return (
    <div className="topics">
      <div className="topics__header">
        <h2 className="topics__title">Topics</h2>
        {<AddButton />}
      </div>

      <div className="topics__content">
        {hasTopics ? (
          <ul className="topics__list">
            {topics.map((topic) => (
              <li key={topic._id} className="topics__list-item">
                <TopicCard topic={topic} />
              </li>
            ))}
          </ul>
        ) : (
          <Message
            message="No topics planned yet"
            subtitle="Create your first one to get started"
            variant="warning"
            iconSrc={StickyNoteIcon}
            actions={<AddButton />}
          />
        )}
      </div>

      {isModalOpen && <AddTopicModal isOpen={true} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Topics;
