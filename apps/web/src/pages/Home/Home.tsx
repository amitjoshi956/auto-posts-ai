import { FC } from 'react';
import { useLatestPost } from '@api/post/query';
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

  const { article = '' } = latestPost || {};
  const showLoader = isFetchingPost || isLoadingPost;

  return (
    <div className="home">
      <h1 className="home__welcome-msg">{`Welcome back, ${userName}`}</h1>
      <div className="home__content">
        {!showLoader && <GenPost content={article} />}
        {showLoader && <Loader message="Fetching Posts" />}
      </div>
    </div>
  );
};

export default Home;
