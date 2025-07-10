import './App.css';
import React from 'react';
import HeaderComponent from './Components/HeaderComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListUserComponent from './Components/ListUserComponent';
import CreateUserComponent from './Components/CreateUserComponent';
import ViewUserComponent from './Components/ViewUserComponent';

function App() {
  return (
    <div className='App'>
      <Router>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route path='/' element={<ListUserComponent />} />
            <Route path='/users' element={<ListUserComponent />} />
            <Route path='/add-user/:id' element={<CreateUserComponent />} />
            <Route path='/view-user/:id' element={<ViewUserComponent />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;