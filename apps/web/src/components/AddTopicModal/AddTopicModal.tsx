import { FC, useState, FormEvent } from 'react';
import { useCreateTopic } from '@api/topic/query';
import { TopicDefaults } from '@autoposts/shared';
import { Modal } from '@components/base';

import './AddTopicModal.scss';

type AddTopicModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddTopicModal: FC<AddTopicModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [createTopic, { isPending }] = useCreateTopic();

  const isSubmitDisabled = isPending || !title.trim();

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTopic(
      { title: title.trim(), description: description.trim() || undefined },
      {
        onSuccess: () => handleClose(),
      }
    );
  };

  return (
    <Modal
      open={isOpen}
      className="add-topic-modal"
      header="New Topic"
      showDefaultFooter
      submitBtnProps={{
        label: 'Create Topic',
        form: 'add-topic-form',
        type: 'submit',
        disabled: isSubmitDisabled,
        isLoading: isPending,
      }}
      closeBtnProps={{
        label: 'Cancel',
      }}
      onClose={handleClose}
    >
      <form id="add-topic-form" className="add-topic-modal__form" onSubmit={handleSubmit}>
        <label className="add-topic-modal__label" htmlFor="topic-title">
          Title
        </label>
        <input
          id="topic-title"
          className="add-topic-modal__input"
          required
          autoFocus
          type="text"
          placeholder="e.g. React Server Components deep-dive"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="add-topic-modal__label" htmlFor="topic-description">
          Description
          <span className="add-topic-modal__char-count">
            {description.length}/{TopicDefaults.DESCRIPTION_MAX_LENGTH}
          </span>
        </label>
        <textarea
          id="topic-description"
          className="add-topic-modal__textarea"
          placeholder="Briefly describe this topic…"
          rows={4}
          value={description}
          maxLength={TopicDefaults.DESCRIPTION_MAX_LENGTH}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </Modal>
  );
};

export default AddTopicModal;
