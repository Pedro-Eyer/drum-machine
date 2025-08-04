import React, { useEffect, useState } from "react";
import "./App.css";

const drumPads = [
  { key: "Q", sound: "Heater 1", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
  { key: "W", sound: "Heater 2", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" },
  { key: "E", sound: "Heater 3", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" },
  { key: "A", sound: "Heater 4", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3" },
  { key: "S", sound: "Clap", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" },
  { key: "D", sound: "Open-HH", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" },
  { key: "Z", sound: "Kick-n'-Hat", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" },
  { key: "X", sound: "Kick", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" },
  { key: "C", sound: "Closed-HH", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" },
];

function App() {
  const [display, setDisplay] = useState("Pressione um botão");

  const playSound = (key) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();

      const pad = drumPads.find(p => p.key === key);
      if (pad) {
        setDisplay(pad.sound);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      const padExists = drumPads.some(pad => pad.key === key);
      if (padExists) {
        playSound(key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="drum-pads">
        {drumPads.map((pad) => (
          <div 
            key={pad.key}
            id={pad.sound} 
            className="drum-pad"
            onClick={() => playSound(pad.key)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.url} preload="auto" ></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
