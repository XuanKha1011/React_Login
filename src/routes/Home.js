import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import users from './../components/data/users';
import "./Home.css"

function Home() {
  let navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const getToken = localStorage.getItem('tokenId')
    
    var newUser = users.map(handleUser)

    function handleUser(user) {
      if (getToken === user.token)
        setUser({
          name: user.name,
          id : user.id,
          email: user.email
        })
    }

     if (!getToken) {
        navigate("/");
      }     
  
  }, []);

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  }


  return(  
    <div className='body'>
      <nav className="navbar-container">
        <span className='title'>Home</span>
        <button type="button" onClick={handleClick}>  Log out</button>
      </nav>
      <div className='App'>
      <main className='home-container'>
        <div className="home-title">User List</div>
        <div className="home-userlist">
          <div className="user-container">
            <div className="home-user">Name: {user.name}</div>   
            <div className="home-user">Email: {user.email}</div>
            <div className="home-user">Id: {user.id}</div>  
          </div>  
        </div>
      </main>
      </div>
    </div>  
  )
}


export default Home
