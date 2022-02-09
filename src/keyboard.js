import React from 'react';
import { useEffect } from "react";


const KeyboardKey = ({ play, sound: { id, keyTrigger, url, keyCode } }) => {

    const handleKeydown = (event) => {
        if (event.keyCode === keyCode) {
            play(keyTrigger, id)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
    }, [])


    return (
        <button id={keyCode} className="drum-pad" onClick={() => play(keyTrigger, id)}>
            <audio src={url} id={keyTrigger} className="clip" />
            {keyTrigger}
        </button>
    )
}


const Keyboard = ({ power, play, sounds }) => {
    return (
        <div className="keyboard">
            {power
                ? sounds.map((sound) => <KeyboardKey play={play} sound={sound} />)
                : sounds.map((sound) => <KeyboardKey play={play} sound={{ ...sound, url: "#" }} />)
            }
        </div>
    );
};

export default Keyboard