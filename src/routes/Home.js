import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "./../components/data/users";
import "./Home.css";

function Home() {
  let navigate = useNavigate();
  const storageMessages = JSON.parse(localStorage.getItem('messages'))

  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(storageMessages ?? []);

  const handleSubmitMessages = () => {
    setMessages(prev => {
      const newMessages = [...prev, message]
            //save to local storage
      const jsonMessages = JSON.stringify(newMessages)
      localStorage.setItem('messages', jsonMessages)
    })
    setMessage("");
  };


  useEffect(() => {
    const getToken = localStorage.getItem("tokenId");

    var newUser = users.map(handleUser);
    let flag = 0;
    function handleUser(user) {
      if (getToken === user.token) {
        setUser({
          name: user.name,
          id: user.id,
          email: user.email,
        });
      }
    }

    for (let i of users) {
      if (getToken === i.token) flag = 1;
    }
    if (flag === 0) {
      navigate("/");
      localStorage.clear();
    }
  }, []);

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="containerHome">
      <div className="layoutComponent">
        <div className="Home-leftLayout ">
          <div className="video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ZqDBgYPpUTg"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="chatBox">
            <div className="chatBoard">
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>{user.name} {message}</li>
                ))}
              </ul>
            </div>
            <div className="formInputMessage">
              <input
                className="inputBox"
                placeholder="Type your message"
                onChange={(e) => setMessage(e.target.value)}
                  value={message}
             />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="red"
                  className="chatIcon heart"
                >
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
              </span>
              <button onClick={handleSubmitMessages}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                class="chatIcon paper-airplane"
              >
                <path
                  color="darkblue"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="Home-rightLayout">
          <nav className="navbar-container">
            <span className="userName">{user.name}</span>
            <button
              type="button"
              onClick={handleClick}
              className="button-logout"
            >
              LOG OUT
            </button>
          </nav>
          <div className="liveStreaming">
            <div className="titleOfEvent">Live Streaming Programme</div>
            <div className="subTime">
              <div className="time">4.00pm</div>
              <div className="time">4.05pm </div>
              <div className="time">4.10pm </div>
              <div className="time">4.15pm </div>
              <div className="time">4.20pm </div>
              <div className="time">4.45pm </div>
              <div className="time">4.50pm </div>
              <div className="time">4.55pm </div>
              <div className="time">5.00pm </div>
            </div>
            <div className="subText">
              <div className="text"> Start of PVPA 2022 Awards Ceremony </div>
              <div className="text"> Arrival of Mdm President </div>
              <div className="text"> Introduction of PVPA 2022 </div>
              <div className="text"> Opening Address by Mdm President </div>
              <div className="text"> Awards Presentation </div>
              <div className="text">
                {" "}
                Presentations of Token of Appreciation to Mdm President{" "}
              </div>
              <div className="text"> Closing Remarks by Chairman, NVPC </div>
              <div className="text"> PVPA's 10th Edition Impact Video </div>
              <div className="text"> End of Event</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
