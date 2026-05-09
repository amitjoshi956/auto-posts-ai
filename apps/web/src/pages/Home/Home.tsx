import { FC } from 'react';
import { useLatestPost, useUpdatePost } from '@api/post/query';
import { GenPost } from '@components/.';
import { Loader } from '@components/base';

import './Home.scss';

type HomeProps = {
  userName: string;
};

const Home: FC<HomeProps> = ({ userName }) => {
  const {
    data: latestPost,
    isFetching: isFetchingPost,
    isLoading: isLoadingPost,
  } = useLatestPost();

  const [updatePost, { isPending: isPendingUpdatePost }] = useUpdatePost();

  const { article = '', _id } = latestPost || {};
  const showLoader = isFetchingPost || isLoadingPost || isPendingUpdatePost;

  const handleUpdatePost = (content: string) => {
    // only update if content is different from the current content
    if (content === article) {
      return;
    }

    updatePost({ id: _id!, payload: { article: content } });
  };

  return (
    <div className="home">
      <h1 className="home__welcome-msg">{`Welcome back, ${userName}`}</h1>
      <div className="home__content">
        {!showLoader && <GenPost content={article} onUpdate={handleUpdatePost} />}
        {showLoader && <Loader message="Fetching Posts" />}
      </div>
    </div>
  );
};

export default Home;
