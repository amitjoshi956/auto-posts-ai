import { useState } from 'react';
import { Link } from 'react-router';
import { CopyIcon, LinkedinIcon, EditIcon, SaveIcon, CancelIcon } from '@assets/icons';
import { Button, Icon, Message } from '@components/base';
import { Nodata } from '@assets/icons';

import './GenPost.scss';

export type GenPostProps = {
  content: string;
  onUpdate?: (content: string) => void;
};

const GenPost: React.FC<GenPostProps> = ({ content, onUpdate }) => {
  const [generatedPost, setGeneratedPost] = useState<string>(content);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const actionBtnLabel = isEditing ? (content === generatedPost ? 'Cancel' : 'Save') : 'Edit';
  const actionBtnIcon = isEditing ? (content === generatedPost ? CancelIcon : SaveIcon) : EditIcon;

  const handlePost = () => {
    if (generatedPost) {
      const encodedPost = encodeURIComponent(generatedPost);
      window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodedPost}`, '_blank');
    }
  };

  const handleCopy = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(generatedPost);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleAction = () => {
    if (isEditing) {
      toggleEdit();
      onUpdate?.(generatedPost);
    } else {
      toggleEdit();
    }
  };

  if (!content) {
    return (
      <Message
        className="gen-post__no-data"
        image={Nodata}
        variant="warning"
        message="No post available"
        subtitle="Schedule a topic to see your post generated"
        actions={<Link to="/topics">Create a Topic</Link>}
      />
    );
  }

  return (
    <div className="gen-post">
      <div className="gen-post__article-container">
        <div className="gen-post__article-actions">
          <button className="gen-post__article-action" onClick={handleAction}>
            <Icon icon={actionBtnIcon} size="sm" />
            {actionBtnLabel}
          </button>
        </div>
        {isEditing ? (
          <textarea
            className="gen-post__article gen-post__article--edit"
            name="genPost-articleEdit"
            value={generatedPost}
            rows={23}
            onChange={(e) => setGeneratedPost(e.target.value)}
          />
        ) : (
          <p className="gen-post__article">{generatedPost}</p>
        )}
      </div>
      <div className="gen-post__actions">
        <Button
          variant="ghost"
          disabled={isEditing}
          icon={CopyIcon}
          label="Copy"
          onClick={handleCopy}
        />
        <Button
          variant="filled"
          disabled={isEditing}
          icon={LinkedinIcon}
          label="Post"
          onClick={handlePost}
        />
      </div>
    </div>
  );
};

export default GenPost;
