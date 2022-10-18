import './App.css';
import Home from './routes/Home'
import About from './routes/About'
import Products from './routes/Products'
import NotFound from './routes/notFound'
import Login from './components/Login'
import Register from './routes/Register';
import Admin from './routes/Admin';
import Users from './routes/users/users';

import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom"


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element= {<Admin />} />
        <Route path="/admin/users" element= {<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  )
    
}

export default App;
