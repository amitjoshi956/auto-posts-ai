import GenPost from '@components/GenPost';

import './Home.scss'


const Home = () => {
  return (
    <div className="home">
      <h1 className='home__welcome-msg'>Welcome back, Amit Joshi</h1>
      <GenPost />
    </div>
  );
};

export default Home;
