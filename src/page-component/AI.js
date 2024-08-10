import { GoogleGenerativeAI } from '@google/generative-ai'
import './AI.css'
import React, { useState } from 'react'
import arrow from '../resource/arrow-up.svg'
import '../resource/font/importFont.css'

export default function AI() {
  const API_KEY = "AIzaSyAD8RiUySiuEdH5hWT8oTi1YPc_WphUnhI";
  const genAI = new GoogleGenerativeAI(API_KEY); 
  
  const [generatedPrompt, setGP] = useState()
  const [userPrompt, setUserPrompt] = useState()
  
  const runAI = (e) => {
    e.preventDefault()
    run()
    document.getElementById('ai-answer').innerText = generatePrompt()
    document.getElementById('ai-user-input').value = ''
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
      document.getElementById('ai-answer').innerText = text
    } catch(error) {
      setGP("Your request couldn't be processed due to an error. " + error)
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

  return (
    <>
      <form onSubmit={runAI} id='ai-input-field'>
        <input type='text' placeholder='Input prompt' onInput={(e) => setUserPrompt(e.target.value)} id='ai-user-input' autoComplete='off'/>
        <button type='submit'><img src={arrow} alt='' id='submit-arrow'/></button>
      </form>
      <div id='ai-answer'></div>
    </>
  )
}