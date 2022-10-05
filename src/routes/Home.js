import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  let navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  }

  useEffect(() => {
    const getEmail = localStorage.getItem('emailData')
    const getPassword = localStorage.getItem('passwordData')
    if ( !getEmail || !getPassword) {
      navigate("/"); 
      
    }
  })

  
  return(  
    <>
      <h1>home</h1>
      <button onClick={handleClick}>Log out</button>
    </>
  )
}


export default Home
