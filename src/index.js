import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from './components/Home/Home';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
// import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Manage from './components/Home/Controller/Manage';
import { DataProvider } from './components/Context/DataProvider';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <>
        <Route path='/' element={<App />} >
          <Route Route path='' element={<Home />} />
          <Route Route path='home' element={<Home />} />
          <Route Route path='login' element={<Login />} />
          <Route Route path='manage' element={<Manage />} />
        </Route>
      </>
    </>
  ));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <DataProvider>
        <App />
      </DataProvider>
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();