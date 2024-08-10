import AI from './page-component/AI.js'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'

export default function Navigation() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/zenai/AI" element={<AI />}/>
          <Route path="/*" element={<MainApp />}/>
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