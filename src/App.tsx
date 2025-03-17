import { HugeiconsIcon } from '@hugeicons/react';
import { AiFileIcon } from '@hugeicons/core-free-icons';
import GenPost from '@components/GenPost';

import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-header__title">
          <HugeiconsIcon className="app-header__title-icon" icon={AiFileIcon} size={32} />
          AutoPosts.<text>ai</text>
        </h1>
      </header>
      <GenPost />
    </div>
  );
}

export default App;
