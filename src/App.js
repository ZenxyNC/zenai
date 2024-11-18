import AI from './page-component/AI/AI.js'
import Login from './page-component/login/login.js'
import Settings from './page-component/settings/settings.js'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import { React, useEffect } from 'react'

export default function Navigation() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/zenai/AI" element = {<AI />}/>
          <Route path='/zenai/login' element = {<Login />} />
          <Route path='/zenai/settings' element={<Settings />}/>
          <Route path="/*" element = {<MainApp />}/>
        </Routes>
      </Router>
    </>
  )
}

function MainApp() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/zenai/AI', { replace : true })
  }, [navigate]);
}