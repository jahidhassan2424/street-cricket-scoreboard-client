import { Outlet } from 'react-router';
import './App.css';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
