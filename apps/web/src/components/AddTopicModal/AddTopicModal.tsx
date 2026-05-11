import { FC, useRef, useState, FormEvent, useEffect } from 'react';
import { TopicDefaults } from '@autoposts/shared';
import { useCreateTopic } from '@api/topic/query';
import { Button } from '@components/base';

import './AddTopicModal.scss';

type AddTopicModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddTopicModal: FC<AddTopicModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="add-topic-modal" onClose={handleClose}>
      <form className="add-topic-modal__form" onSubmit={handleSubmit}>
        <h2 className="add-topic-modal__heading">New Topic</h2>

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

        <div className="add-topic-modal__actions">
          <Button type="button" size="sm" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button size="sm" type="submit" disabled={isSubmitDisabled} isLoading={isPending}>
            Create Topic
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default AddTopicModal;
