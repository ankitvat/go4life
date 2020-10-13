import React, { useState, useRef } from 'react';
import ad from '../assets/ad.png';
import { POST } from '../utils/api.js';
import logo from '../assets/logo.png';

export default function Landing() {
  const myRef = useRef(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if(name.length === 0) {
      setMessage("Please enter your name");
      return;
    }
    else if(phone.length === 0) {
      setMessage("Please enter your phone number");
      return;
    }
    else if(email.length === 0) {
      setMessage("Please enter your email");
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
      setMessage("Your request was submitted successfully!");
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

            <p>Fresh apples, from the land of Karan Chauhan</p>
            <p>
              Hassle free. Free Delivery at your door step
            </p>
            <p>
              Pesticides and chemicals free
            </p>
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
          <div className="form">
            <p>Your first step to the freshest apples</p>
            <input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}/>
            <input
              placeholder="Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}/>
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}/>
            <p className="message">{message}</p>
            <button onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="footer">
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
