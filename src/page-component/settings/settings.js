import React, {useState, useEffect} from 'react'
import './settings.css'

export default function Settings({username, onClose}) {
  const [customSettings, setCustomSettings] = useState(localStorage.getItem("customSettings-zenai"))
  const [selectedTheme,setSelectedTheme] = useState(localStorage.getItem("customTheme-zenai"))
  const [customInstructions,setCustomInstructions] = useState(localStorage.getItem("customInstructions-zenai"))
  const [notifyUpdates,setNotifyUpdates] = useState(localStorage.getItem("notifyUpdates-zenai"))
  const [figureOfSpeech, setFigureOfSpeech] = useState(localStorage.getItem("figureOfSpeech-zenai"))

  useEffect(() => {
    if(customSettings) {
      setSelectedTheme(localStorage.getItem('customTheme-zenai'))
      setCustomInstructions(localStorage.getItem('customInstructions-zenai'))
      setFigureOfSpeech(localStorage.getItem('figureOfSpeech-zenai'))
      setNotifyUpdates(localStorage.getItem('notifyUpdates-zenai'))
      if(notifyUpdates === true || notifyUpdates === "true") {
        document.getElementById('notifyUpdates-opt').style.backgroundColor = 'rgb(0, 122, 255, 0.3)'
      } else {
        document.getElementById('notifyUpdates-opt').style.backgroundColor = 'rgb(49, 71, 94, 0.3)'
      }

    } else {
      localStorage.setItem("customSettings-zenai", true)
      localStorage.setItem("customTheme-zenai", "dark")
      localStorage.setItem("customInstruction-zenai", undefined)
      localStorage.setItem("notifyUpdates-zenai", true)
      localStorage.setItem("figureOfSpeech-zenai", "friendly")
    }
  }, [])

  const handleThemeChanges = (e) => {
    if (e === "dark") {
      localStorage.setItem("customTheme-zenai", "dark")
      setSelectedTheme("dark")
    } else if (e === "light") {
      localStorage.setItem("customTheme-zenai", "light")
      setSelectedTheme("light")
    }
  };
  console.log(customSettings, selectedTheme, notifyUpdates, figureOfSpeech)

  const handleNotificationChanges = (e) => {
    if (e === "true") {
      localStorage.setItem("notifyUpdates-zenai", true)
      setNotifyUpdates(true)
      document.getElementById('notifyUpdates-opt').style.backgroundColor = 'rgb(0, 122, 255, 0.3)'
    } else {
      localStorage.setItem("notifyUpdates-zenai", false)
      setNotifyUpdates(false)
      document.getElementById('notifyUpdates-opt').style.backgroundColor = 'rgb(49, 71, 94, 0.3)'
    }
  }
  const handleFOSChanges = (e) => {
    if (e === "friendly") {
      localStorage.setItem("figureOfSpeech-zenai", "friendly")
      setFigureOfSpeech("friendly")
    } else {
      localStorage.setItem("figureOfSpeech-zenai", "formal")
      setFigureOfSpeech("formal")
    }
  }
  return (
    <div id='fullscreen-basic'>
      <div id='withNavmenu-basic'>
        <div id='settings-overlay'>
          <div id='settingsAuto-padding'>
            <span id='userLogin'>Logged in as <span style={{fontFamily : 'GSansBold'}}>{username}</span></span><br/>
            <div id='theme-section'>
              <span className='left-settings-element'>Theme</span>
              <select className='right-settings-element' value={selectedTheme} onChange={(e) => handleThemeChanges(e.target.value)}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div><br/>
            <div id='customInstruction-section' className='settings-contents'>
              <span className='left-settings-element'>Custom Instructions</span>
              <div id='customInstruction-setup' className='right-settings-element'>Set</div>
            </div><br/>
            <div id='notifyUpdates-section' className='settings-contents'>
              <span className='left-settings-element'>Notify Updates</span>
              <select className='right-settings-element' onChange={(e) => handleNotificationChanges(e.target.value)} id='notifyUpdates-opt' value={notifyUpdates}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div><br/>
            <div id='figureOfSpeech-section' className='settings-contents'>
              <span className='left-settings-element'>Figure of speech</span>
              <select className='right-settings-element' onChange={(e) => handleFOSChanges(e.target.value)} value={figureOfSpeech}>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div id='close-element' onClick={onClose}></div>
          </div>
        </div>
      </div>
    </div>
  )
}