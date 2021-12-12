import React, { useState } from 'react';
import MainPage from './pages/MainPage';
import './styles/index.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import UserPage from './pages/UserPage';
import UsersContext from './contexts/UsersContext';

function App() {

  const [listOfUsers, setListOfUsers] = useState(
    {} as Array<UserInterfaceContext>
  );

  return (
      <UsersContext.Provider value={{ listOfUsers, setListOfUsers }}>
        <Router>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/user/:id' element={<UserPage />} />
          </Routes>
        </Router>
      </UsersContext.Provider>
  );
}

export default App;
