import { GoogleGenerativeAI } from '@google/generative-ai';
import './AI.css';
import React, { useEffect, useState, useRef } from 'react';
import arrow from '../../resource/arrow-up.svg';
import '../../resource/font/importFont.css';
import { useNavigate } from 'react-router-dom';

export default function AI() {
  const navigate = useNavigate()
  const API_KEY = "AIzaSyAD8RiUySiuEdH5hWT8oTi1YPc_WphUnhI";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const [userPrompt, setUserPrompt] = useState('');
  const [AIResponse, setResponse] = useState('')
  // eslint-disable-next-line
  const [isLoggedIn, setLog] = useState(localStorage.getItem('isLoggedIn-zenai'));
  // eslint-disable-next-line
  const [username, setUsername] = useState('Log in');
  // eslint-disable-next-line
  const [greeting, setGreet] = useState(getGreeting());

  var currentUserPrompt

  try {
    useEffect(() => {
      if(isLoggedIn) {
        setUsername(localStorage.getItem('username-zenai'))
      }
    }, [isLoggedIn])
  } catch(error) {
    console.log(error)
  }

  const runAI = async (e) => {
    e.preventDefault();
    setResponse(generatePrompt())
    document.getElementById('user-prompt-display').innerText = userPrompt
    currentUserPrompt = document.getElementById('ai-user-input').value
    document.getElementById('ai-user-input').value = '';
    run();
    document.getElementById('chatbox').style.opacity = 1;
    document.getElementById('greeting').style.opacity = 0;
  };

  async function run() {

    var chatHistory = {
      history: [
        {
          role: "user",
          parts: [{ text: "Kita pake bahasa yang friendly ajaa, tapi tetep sopan yaa." }],
        },
        {
          role: "model",
          parts: [{ text: "Oke!" }],
        }
      ]
    }

    try {
      const chat = model.startChat(chatHistory);
      const result = await chat.sendMessageStream(userPrompt);
      const response = await result.response;
      var answer = response.text();
      try {
        var categorized = answer.replace(/(?<!\*)\*(?!\*)/g, '•')
        var formattedAnswer = categorized.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      } catch(err) {
        console.log('No format needed')
      }
      setResponse(formattedAnswer)
    } catch (error) {
      return "Your request couldn't be processed due to an error: " + error;
    }
  }

  function generatePrompt() {
    const maths = Math.floor(Math.random() * 80) + 1;
    if (maths <= 10) {
      return "Thinking best answer..";
    } else if (maths <= 20) {
      return "One moment!";
    } else if (maths <= 30) {
      return "Creating creative answer.."
    } else if (maths <=40) {
      return "On it, Good things are coming!"
    } else if (maths <= 50) {
      return "Almost there.."
    } else if (maths <= 60) {
      return "Thinking in different angle.."
    } else if (maths <= 70) {
      return "Thinking best answer.."
    }
    else {   
      return "Finding more information..";
    }
  }

  function abortGeneration() {

  }

  function getGreeting() {
    const hours = new Date().getHours();
    const timeOfDay = hours < 12 ? "morning" : hours < 18 ? "afternoon" : "night";

    return `Good ${timeOfDay}.`;
  }

  function setNavbar(type) {
    if (type === 'show') {
      document.getElementById('navmenu').style.transform = 'translateX(0px)';
      document.getElementById('close-menu').style.display = 'block';
    } else if (type === 'hide') {
      document.getElementById('navmenu').style.transform = 'translateX(-100%)';
      document.getElementById('close-menu').style.display = 'none';
    }
  }

  function proceedRedirect() {
    if(isLoggedIn) {

    } else if (isLoggedIn !== true) {
      navigate('/zenai/login', {replace : true})
    }
  }

  const focuselement = useRef(null);

  useEffect(() => {
    focuselement.current.focus()
  }, [])
  function requestPasscode() {
    window.alert("Restricted Access. Developer only entry!")
    var reqPasscode = window.prompt('Password?')
    if (reqPasscode === 'Lucas.2308') {
      document.getElementById('hibernated-screen').style.display = 'none'
    } else {
      window.alert('Incorrect password')
    }
  }

  return (
    <>
      <div id='hibernated-screen'>
        <div id='hibernated-layout-div'>
          <div id='hibernated-logo' onDoubleClick={requestPasscode}></div>
          <div id='hibernated-title'>ZenAI is currently hibernated for a while.</div>
        </div>
      </div>
      <div id='greeting'>{greeting}</div>
      <div id='navmenu'>
        <div id="model-selection">
          ZenAI 1.0<span>(test unit)</span>
        </div>
        <div id='user-info' className={`user-info ${isLoggedIn ? 'isLoggedIn' : 'isNotLoggedIn'}`} onClick={proceedRedirect}>
          {username}
        </div>
        <div className={`app-settings ${isLoggedIn ? 'shown' : 'hidden'}`} onClick={() => navigate('/zenai/AI#settings', {replace : false})}>
        </div>
      </div>
      <div id='close-menu' onClick={() => setNavbar('hide')}></div>
      <div id='navbar'>
        <div id='navbar-logo'></div>
        <span id='navbar-title'>ZenAI</span>
        <button className='nav-menu-button-wrap' onClick={() => setNavbar('show')}>
          <div></div>
          <div></div>
        </button>
      </div>
      <form onSubmit={runAI} id='ai-input-field'>
        <input
          type='text'
          placeholder='Ask something..'
          onInput={(e) => setUserPrompt(e.target.value)}
          id='ai-user-input'
          autoComplete='off'
          ref={focuselement}
          required
        />
        <button type='submit'><img src={arrow} alt='' id='submit-arrow' /></button>
      </form>
      <div id='chatbox'>
        <div id='ai-textbox'>
          <div id='user-prompt-wrapper'>
            <div id='user-prompt-display'></div>
          </div>
          <div id='ai-profile'></div>
          <div id='ai-answer' dangerouslySetInnerHTML={{ __html: AIResponse }}></div>
        </div>
      </div>
    </>
  );
}
