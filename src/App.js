import React from 'react'
import { useState } from "react";
import { firstSoundsGroup, secondSoundsGroup } from './data'
import Keyboard from './keyboard'
import DumControle from './dumcontrole'

const soundsName = {
  heaterKit: 'Heater Kit',
  smoothPianoKit: 'Smooth Piano Kit'
}

const soundsGroup = {
  heaterKit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup
}


function App() {
  const [power, setPower] = useState(true)
  const [volume, setVolume] = useState(1)
  const [soundName, setSoundName] = useState("")
  const [soundType, setSoundType] = useState("heaterKit")
  const [sounds, setSounds] = useState(soundsGroup[soundType])

  const stop = () => {
    setPower(!power)
  }


  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  }

  const styleActiveKey = (audio) => {
    audio.parentElement.style.backgroundColor = "#000"
    audio.parentElement.style.color = "#fff"
  }

  const deactivateAudio = (audio) => {
    setTimeout(() => {
      audio.parentElement.style.backgroundColor = "#fff"
      audio.parentElement.style.color = "#000"
    }, 300)
  }


  const play = (keyTrigger, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(keyTrigger)
    styleActiveKey(audio)
    audio.currentTime = 0;
    audio.play()
    deactivateAudio(audio)
  }

  const changeSounds = () => {
    setSoundName('')
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit")
      setSounds(soundsGroup.smoothPianoKit)
    } else {
      setSoundType("heaterKit")
      setSounds(soundsGroup.heaterKit)
    }
  }

  const setKeyVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.keyTrigger))
    audios.forEach(audio => {
      if (audio) {
        audio.volume = volume
      }
    })
  }


  return (
    <div className="drum-machine">
      {setKeyVolume()}
      <div className="wrapper">
        <Keyboard power={power} play={play} sounds={sounds} />
        <DumControle
          stop={stop}
          power={power}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          name={soundName || soundsName[soundType]}
          changeSounds={changeSounds}
        />
      </div>
    </div>
  );
}


export default App;
