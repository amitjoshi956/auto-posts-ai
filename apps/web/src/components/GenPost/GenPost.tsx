import { useState } from 'react';
import { CopyIcon, LinkedinIcon, EditIcon, SaveIcon } from '@assets/icons';
import { Button, Icon, Message } from '@components/base';
import { Nodata } from '@assets/icons';

import './GenPost.scss';
import { Link } from 'react-router';

export type GenPostProps = {
  content: string;
};

const GenPost: React.FC<GenPostProps> = ({ content }) => {
  const [generatedPost, setGeneratedPost] = useState<string>(content);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const actionBtnLabel = isEditing ? 'Save' : 'Edit';
  const actionBtnIcon = isEditing ? SaveIcon : EditIcon;

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

  if (!content) {
    return (
      <Message
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
          <button className="gen-post__article-action" onClick={toggleEdit}>
            <Icon icon={actionBtnIcon} size="sm" />
            {actionBtnLabel}
          </button>
        </div>
        {isEditing ? (
          <textarea
            className="gen-post__article--edit"
            value={generatedPost}
            rows={10}
            onChange={(e) => setGeneratedPost(e.target.value)}
          />
        ) : (
          <p className="gen-post__article">{generatedPost}</p>
        )}
      </div>
      <div className="gen-post__actions">
        <Button variant="ghost" icon={CopyIcon} label="Copy" onClick={handleCopy} />
        <Button variant="filled" icon={LinkedinIcon} label="Post" onClick={handlePost} />
      </div>
    </div>
  );
};

export default GenPost;
