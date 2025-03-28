import axios from 'axios';

export const generatePost = async (prompt: string): Promise<Post> => {
  const apiKey = 'some-dummy-key'; // getGeminiApiKey();

  if (!apiKey) {
    console.error('Error reading API Key!');
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
      return newPost;
    } else {
      // logger.error('Error generating post: Response has not the expected structure');
      return null;
    }
  } catch (error) {
    // logger.error('Error generating post:', error);
    return null;
  }
};

export const fetchGeneratedPost = () => {
  return axios.get('/next-post').then((res) => res.data);
};
