import React from "react";
import "./App.css";

const drumPads = [
  { key: "Q", sound: "Heater 1" },
  { key: "W", sound: "Heater 2" },
  { key: "E", sound: "Heater 3" },
  { key: "A", sound: "Heater 4" },
  { key: "S", sound: "Clap" },
  { key: "D", sound: "Open-HH" },
  { key: "Z", sound: "Kick-n'-Hat" },
  { key: "X", sound: "Kick" },
  { key: "C", sound: "Closed-HH" },
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