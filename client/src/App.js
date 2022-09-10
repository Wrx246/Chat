import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Chat from './pages/Chat'
import ProtectedRoutes from './pages/ProtectedRoutes'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
