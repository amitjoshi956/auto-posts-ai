import { useState } from 'react';

import './GenPost.scss';

const msg = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum aliquid suscipit nostrum autem soluta ad fugit maiores odio asperiores natus, accusantium debitis temporibus id placeat error commodi, in deserunt fugiat.
Necessitatibus omnis amet hic officiis asperiores facilis, quibusdam veritatis fugit, exercitationem quas laudantium, ab aliquid ipsam dolorum suscipit quasi labore quos architecto expedita repudiandae nesciunt aliquam. Distinctio recusandae eligendi aut.
A eligendi fugiat qui fuga velit, tempore facere, perferendis, odit quam assumenda iure molestiae animi obcaecati expedita necessitatibus? Fuga officiis aspernatur doloremque voluptatum deserunt! Sequi assumenda in quos qui dolorem!
Fugit fuga nihil ipsum et, quisquam magnam. Dolorum asperiores ipsum blanditiis doloremque voluptate, possimus quo officia reprehenderit voluptatum beatae ipsa doloribus placeat ratione fuga pariatur, odio quae. Natus, doloribus harum!
Tempore ad quidem eum similique nisi ea sapiente laborum voluptatum, suscipit magnam assumenda nemo, quis consectetur eaque neque enim provident delectus totam, fugit a corrupti architecto. Minus nihil molestias eum`;

const GenPost: React.FC = () => {
  const [generatedPost, setGeneratedPost] = useState<string>(msg);

  // useEffect(() => {
  //   const fetchGeneratedPost = async () => {
  //     try {
  //       const response = await api.get('/api/post');
  //       setGeneratedPost(response.data.post);
  //     } catch (error) {
  //       setGeneratedPost('Error fetching the post!')
  //     }
  //   };

  //   fetchGeneratedPost();
  // }, [])

  return (
    <div className="gen-post">
      {generatedPost && <p className="gen-post__article">{generatedPost}</p>}
      <div className="gen-post__actions">
        <button className="gen-post__action-btn gen-post__action-btn--copy">Copy</button>
        <button className="gen-post__action-btn gen-post__action-btn--post">Post</button>
      </div>
    </div>
  );
};

export default GenPost;
