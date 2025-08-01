import React from "react";
import "./App.css";

const drumPads = [
  { key: "Q", sound: "Heater 1", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
  { key: "W", sound: "Heater 2", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
  { key: "E", sound: "Heater 3", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"},
  { key: "A", sound: "Heater 4", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"},
  { key: "S", sound: "Clap", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
  { key: "D", sound: "Open-HH", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
  { key: "Z", sound: "Kick-n'-Hat", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
  { key: "X", sound: "Kick", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
  { key: "C", sound: "Closed-HH", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
]
function App() {
  return (
    <div id="drum-machine">
      {/* Contêiner principal */}
      <div id="display">
        {/* Este será o display onde mostraremos o nome do som tocado */}
        Pressione um botão
      </div>

      {/* Botões de tambores */}
      <div className="drum-pads">
        {drumPads.map((pad) => (
          <div key={pad.key} id={pad.sound} className="drum-pad">
            {pad.key}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;