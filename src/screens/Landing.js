import React, { useState, useRef } from 'react';
import ad from '../assets/ad.png';
import { POST } from '../utils/api.js';
import logo from '../assets/logo.png';
import tick from '../assets/tick.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faTruck, faSprayCan } from '@fortawesome/free-solid-svg-icons';

export default function Landing() {
  const myRef = useRef(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if(name.length === 0) {
      setMessage("Please enter your name");
      setError("name");
      return;
    }
    else if(phone.length === 0) {
      setMessage("Please enter your phone number");
      setError("phone");
      return;
    }
    else if(email.length === 0) {
      setMessage("Please enter your email");
      setError("email");
      return;
    }

    const body = {
      name: name,
      phone: phone,
      email: email
    };

    const response = await POST('/leads', body);
    const result = await response.json();

    if(response.status === 400) {
      if(result.email)
        setMessage(result.email[0].slice(0, -1));
      else
        setMessage("An error occured, please try again");
    }
    else if(response.status === 201) {
      setSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
    }
  }

  const scrollToRef = () => window.scrollTo(0, myRef.current.offsetTop)

  return (
    <>
      <div className="landing-control">
        <div className="landing-intro">
          <img
            alt="logo"
            className="landing-logo"
            src={logo}
          />
          <div className="intro-content">
            <div className="content-line">
              <p>Fresh apples, from the land of Karan Chauhan</p>
            </div>

            <div className="content-line">
              <div className="icon-wrapper">
                <FontAwesomeIcon className="icon" icon={faTruck} size="1x"/>
              </div>
              <p>Hassle free. Free Delivery at your door step</p>
            </div>

            <div className="content-line">
              <div className="icon-wrapper">
                <FontAwesomeIcon className="icon" icon={faSprayCan} size="1x"/>
              </div>
              <p>Pesticides and chemicals free</p>
            </div>
            <button onClick={scrollToRef}>
              Know More
            </button>
          </div>
        </div>
        <div className="landing-ad">
          <div className="ad-image">
            <img alt="ad" src={ad}/>
          </div>
        </div>
      </div>
      <div ref={myRef} className="form-control">
        <div className="form-content">
          {!success ?
            <div className="form">
              <p>Your first step to the freshest apples</p>
              <input
                placeholder="Name"
                value={name}
                className={error === "name" ? "error" : ""}
                onChange={e => {
                  setName(e.target.value);
                  setError("");
                  setMessage("");
                }}/>
              <input
                placeholder="Phone"
                value={phone}
                className={error === "phone" ? "error" : ""}
                onChange={e => {
                  setPhone(e.target.value);
                  setError("");
                  setMessage("");
                }}/>
              <input
                placeholder="Email"
                value={email}
                className={error === "email" ? "error" : ""}
                onChange={e => {
                  setEmail(e.target.value);
                  setError("");
                  setMessage("");
                }}/>
              <p className="message">{message}</p>
              <button onClick={handleSubmit}>
                Submit
              </button>
            </div> :
            <div className="form-success">
              <img
                alt="tick"
                src={tick}
              />
              <p>Your request was successfully submitted!</p>
            </div>
          }
        </div>
        <div className="footer">
          <div className="footer-section">
            <img
              alt="logo"
              className="landing-logo"
              src={logo}
            />
          </div>
          <div className="footer-section">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
          <div className="footer-section">
            <p>Contact Us</p>
            <p>About</p>
          </div>
        </div>
      </div>
    </>
  );
}
