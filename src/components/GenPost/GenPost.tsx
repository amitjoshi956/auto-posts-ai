import { useState, ChangeEvent } from "react";
import axios from "axios";
import { getApiKey } from "@src/config";

import "./GenPost.scss";

const GenPost: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [generatedPost, setGeneratedPost] = useState<string>("");

  const handlePromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleClearClick = () => {
    setPrompt("");
  };

  const generatePost = async () => {
    if (!import.meta.env.VITE_API_KEY) {
      console.error("VITE_API_KEY is not set. Please set it in the .env file.");
      return;
    }

    const apiKey = getApiKey();

    if (!apiKey) {
      console.error(
        "Error reading API Key, verify the .env file and config.ts file"
      );
    }

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
          apiKey,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (
        response.data.candidates &&
        response.data.candidates[0] &&
        response.data.candidates[0].content &&
        response.data.candidates[0].content.parts &&
        response.data.candidates[0].content.parts[0]
      ) {
        const newPost = response.data.candidates[0].content.parts[0].text;
        setGeneratedPost(newPost);
      } else {
        console.error(
          "Error generating post: Response has not the expected structure"
        );
      }
    } catch (error) {
      console.error("Error generating post:", error);
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
          <button className="gen-post__generate-button" onClick={generatePost}>
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
