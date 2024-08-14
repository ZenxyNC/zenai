import { GoogleGenerativeAI } from '@google/generative-ai';
import './AI.css';
import React, { useEffect, useState, useRef } from 'react';
import arrow from '../resource/arrow-up.svg';
import '../resource/font/importFont.css';

export default function AI() {
  const API_KEY = "AIzaSyAD8RiUySiuEdH5hWT8oTi1YPc_WphUnhI";
  const genAI = new GoogleGenerativeAI(API_KEY);

  const [userPrompt, setUserPrompt] = useState('');
  const [AIResponse, setResponse] = useState('')
  const [isLoggedIn, setLog] = useState(localStorage.getItem('isLoggedIn'));
  const [username, setUsername] = useState('');
  const [greeting, setGreet] = useState(getGreeting());

  /*function displayChat() {
    try {
      document.getElementById('user-prompt-display').setAttribute('id', '')
      document.getElementById('ai-answer').setAttribute('id', '')
    } catch(err) {
      console.log(err)
    }
    var createTextBox = document.createElement('div')
    createTextBox.setAttribute('id', 'ai-textbox')
    createTextBox.innerHTML = (
      <>
        <div id='user-prompt-wrapper'>
          <div id='user-prompt-display' className='user-prompt-display'></div>
        </div>
        <div id='ai-profile'></div>
        <div id='ai-answer' className='ai-answer'></div>
      </>
    )
    document.getElementById('chatbox').appendChild(createTextBox)
    document.getElementById('user-prompt-display').innerText = userPrompt;
    document.getElementById('ai-answer').innerText = AIResponse
  }*/

  const runAI = async (e) => {
    e.preventDefault();
    setResponse(generatePrompt())
    document.getElementById('user-prompt-display').innerText = userPrompt
    document.getElementById('ai-user-input').value = '';
    run();
    document.getElementById('chatbox').style.opacity = 1;
    document.getElementById('greeting').style.opacity = 0;
  };

  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chatHistory = {
      history: [
        {
          role: "user",
          parts: [{ text: "Kita pake bahasa yang gampang atau friendly ajaa, tapi tetep sopan yaa." }],
        },
        {
          role: "model",
          parts: [{ text: "Got it!" }],
        },
      ],
    };

    try {
      const chat = model.startChat(chatHistory);
      const result = await chat.sendMessageStream(userPrompt);
      const response = await result.response;
      var answer = response.text();
      setResponse(answer)
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
      return "Asking my friend.."
    }
    else {   
      return "AI is thinking..";
    }
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

  const focuselement = useRef(null);

  useEffect(() => {
    focuselement.current.focus()
  }, [])

  return (
    <>
      <div id='greeting'>{greeting}</div>
      <div id='navmenu'>
        <div id="model-selection">
          ZenAI 1.0<span>(beta)</span>
        </div>
        <div id='user-info'>
          Log in
        </div>
      </div>
      <div id='close-menu' onClick={() => setNavbar('hide')}></div>
      <div id='navbar'>
        <div id='navbar-logo'></div>
        <span id='navbar-title'>ZenAI</span>
        <div className='nav-menu-button-wrap' onClick={() => setNavbar('show')}>
          <div></div>
          <div></div>
        </div>
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
          <div id='ai-answer'>{AIResponse}</div>
        </div>
      </div>
    </>
  );
}
