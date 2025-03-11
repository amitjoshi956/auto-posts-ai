import { useState, ChangeEvent } from 'react';
import { generatePost } from '@api/post';

import './GenPost.scss';

const GenPost: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedPost, setGeneratedPost] = useState<string>('');

  const handlePromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleClearClick = () => {
    setPrompt('');
  };

  const handleGenerateClick = async () => {
    const newPost = await generatePost(prompt);
    if (newPost) {
      setGeneratedPost(newPost);
    }
  };

  return (
    <div className="gen-post">
      <div className="gen-post__prompt-section">
        <textarea
          className="gen-post__prompt-input"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your prompt here..."
        />
        <div className="gen-post__button-container">
          <button className="gen-post__clear-button" onClick={handleClearClick}>
            Clear
          </button>
          <button
            className="gen-post__generate-button"
            onClick={handleGenerateClick}
          >
            Generate Post
          </button>
        </div>
      </div>
      <div className="gen-post__generated-post-section">
        {generatedPost && (
          <p className="gen-post__generated-post-text">{generatedPost}</p>
        )}
      </div>
    </div>
  );
};

export default GenPost;
