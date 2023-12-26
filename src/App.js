import { Outlet } from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App bg-[#DDDDDD] pb-10 h-[500vh]">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
