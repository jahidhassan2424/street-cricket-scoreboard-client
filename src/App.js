import { Outlet } from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import { DataProvider } from './components/Context/DataProvider';

function App() {
  return (
    <div className="App bg-[#DDDDDD] pb-10 h-[500vh]">
      <DataProvider>
        <Nav />
        <Outlet />
      </DataProvider>
    </div>
  );
}

export default App;
