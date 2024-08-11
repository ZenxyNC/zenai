import { GoogleGenerativeAI } from '@google/generative-ai'
import './AI.css'
import React, { useEffect, useState } from 'react'
import arrow from '../resource/arrow-up.svg'
import '../resource/font/importFont.css'

export default function AI() {
  const API_KEY = "AIzaSyAD8RiUySiuEdH5hWT8oTi1YPc_WphUnhI";
  const genAI = new GoogleGenerativeAI(API_KEY); 
  
  const [generatedPrompt, setGP] = useState()
  const [userPrompt, setUserPrompt] = useState()
  const [isLoggedIn, setLog] = useState(localStorage.getItem('isLoggedIn'))
  const [username, setUsername] = useState()
  const [greeting, setGreet] = useState(getGreeting())

  useEffect(() => {
    if (isLoggedIn) {
      setUsername(localStorage.getItem('username'))
    } else {
      setUsername(undefined)
      setLog(false)
    }
  }, [isLoggedIn])
  
  const runAI = (e) => {
    e.preventDefault()
    run()
    document.getElementById('ai-answer').innerText = generatePrompt()
    document.getElementById('user-prompt-display').innerText = document.getElementById('ai-user-input').value
    document.getElementById('ai-user-input').value = ''
    document.getElementById('chatbox').style.opacity = 1
    document.getElementById('greeting').style.opacity = 0
  }
  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    var chatHistory = 
    {
      history : [
        {
          role: "user",
          parts: [{text : "Kita pake bahasa yang gampang atau friendly ajaa, gausah terlalu kaku."}],
        },
        {
          role: "model",
          parts: [{text: ""}]
        }
      ]
    }
    try {
      const chat = model.startChat(chatHistory);

      const result = await chat.sendMessage(userPrompt);
      const response = await result.response;
      const text = response.text();
      setGP(text)
      /*document.getElementById('ai-answer').innerText = text
      navigator.clipboard.writeText(text).then(function() {

      }).catch(function(error){
        console.log(error)
      })*/ 
    } catch(error) {
      setGP("Your request couldn't be processed due to an error. " + error)
      document.getElementById('ai-answer').innerText = generatedPrompt
    }
  }

  function generatePrompt() {
    let maths = Math.floor(Math.random() * (30 - 1 + 1)) + 1
    console.log(maths)
    if (maths >= 1 && maths <= 10) {
      return "AI is thinking.."
    } else if (maths >= 11 && maths <= 20) {
      return "One moment, please!"
    } else if (maths >= 21 && maths <=30) {
      return "Understood, preparing for your answer!"
    }
  }

  function getGreeting() {
    var day = new Date();
    var hours = day.getHours();
    let greeting

    if (hours >= 1 && hours <= 11) {
      greeting = "morning"
    } else if (hours >= 11 && hours <= 18) {
      greeting = "afternoon"
    } else if (hours >= 18 && hours <= 23) {
      greeting = "night"
    }

    if (isLoggedIn) {
      return "Good " + greeting + '.'
    } else {
      return "Good " + greeting + '.'
    }
  }

  function setNavbar(type) {
    if (type === 'show') {
      document.getElementById('navmenu').style.transform = 'translateX(0px)';
      document.getElementById('close-menu').style.display = 'block'
    } else if (type === 'hide') {
      document.getElementById('navmenu').style.transform = 'translateX(-100%)';
      document.getElementById('close-menu').style.display = 'none'
    }
  }

  return (
    <>
      <div id='greeting'>{greeting}</div>
      <div id='navmenu'>
        <div id="model-selection">
          ZenAI 1.0<span>(beta)</span>
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
        <input type='text' placeholder='Ask something..' onInput={(e) => setUserPrompt(e.target.value)} id='ai-user-input' autoComplete='off'/>
        <button type='submit'><img src={arrow} alt='' id='submit-arrow'/></button>
      </form>
      <div id='chatbox'>
        <div id='ai-textbox'>
          <div id='user-prompt-wrapper'>
            <div id='user-prompt-display'></div>
          </div>
          <div id='ai-profile'></div>
          <div id='ai-answer'></div>
        </div>
      </div>
    </>
  )
}