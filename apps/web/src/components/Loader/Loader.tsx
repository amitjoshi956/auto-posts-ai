import { FC } from 'react';

import './Loader.scss';

type LoaderProps = {
  message?: string;
};

const Loader: FC<LoaderProps> = ({ message = '' }) => {
  return (
    <div className="loader">
      <div className="loader__content">
        <div className="loader__spinner"></div>
        {message && <span className="loader__message">{message}</span>}
      </div>
    </div>
  );
};

export default Loader;
