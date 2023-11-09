import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth} from "./ruteo/AuthContext";
import BarraRutasProtected from './ruteo/BarraRutasProtected';
import BarraRutasPublic from './ruteo/BarraRutasPublic';


const App = () => {
  const { user } = useAuth();
  return (
    <div style={{ background:"violet"}}>
      
      <h1>App.js</h1>
      <Router>
      { user ? <BarraRutasProtected /> : <BarraRutasPublic />}
      </Router>
    </div>
  )
}

export default App
