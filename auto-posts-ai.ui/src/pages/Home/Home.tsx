import { FC } from 'react';
import GenPost from '@components/GenPost';

import './Home.scss';

type HomeProps = {
  userName: string;
};

const Home: FC<HomeProps> = ({ userName }) => {
  return (
    <div className="home">
      <h1 className="home__welcome-msg">{`Welcome back, ${userName}`}</h1>
      <GenPost />
    </div>
  );
};

export default Home;
