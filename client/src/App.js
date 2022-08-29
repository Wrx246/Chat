import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './components/Registration'
import Login from './components/Login'
import Chat from './components/Chat'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
