import AppHeader from '@components/AppHeader';
import Home from './pages/Home';

import './App.scss';

function App() {
  return (
    <div className="app">
      <AppHeader isLoggedIn={false} />
      <Home />
    </div>
  );
}

export default App;
