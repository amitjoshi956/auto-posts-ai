import './App.scss';
import GenPost from '@components/GenPost';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-header__title">
          AutoPosts.<text>ai</text>
        </h1>
      </header>
      <GenPost />
    </div>
  );
}

export default App;
