import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import users from './../components/data/users';
import "./Home.css"

function Home() {
  let navigate = useNavigate();
  const getToken = localStorage.getItem('tokenId')
    let userEmail;
    let userName;
    let userId;
      for (let i of users){
        if (getToken === i.token){
          console.log(i.id, i.name, i.email)
          userEmail = i.email;
          userName = i.name;
          userId = i.id;

        }
      }

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  }


  // useEffect(() => {
  //   const getEmail = localStorage.getItem('emailData')
  //   const getPassword = localStorage.getItem('passwordData')
  //   if ( !getEmail || !getPassword) {
  //     navigate("/");  
  //   }
  // })

  useEffect(() => {
    if (!getToken) {
      navigate("/");
    }
  });


  return(  
    <div className='body'>
      <nav className="navbar-container">
        <span className='title'>Home</span>
        <span onClick={handleClick}>  Log out</span>
      </nav>
      <div className='App'>
      <main className='home-container'>
        <div className="home-title">User List</div>
        <div className="home-userlist">
          <div className="user-container">
            <div className="home-user">Name: {userName}</div>   
            <div className="home-user">Email: {userEmail}</div>
            <div className="home-user">Id: {userId}</div>  
          </div>  
        </div>
      </main>
      </div>
    </div>  
  )
}


export default Home
