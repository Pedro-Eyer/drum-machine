import React, { useEffect, useState } from "react";
import "./App.css";

const bankOne = [
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

const bankTwo = [
  { key: "Q", sound: "Chord 1", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
  { key: "W", sound: "Chord 2", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
  { key: "E", sound: "Chord 3", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },
  { key: "A", sound: "Shaker", url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
  { key: "S", sound: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },
  { key: "D", sound: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },
  { key: "Z", sound: "Punchy Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },
  { key: "X", sound: "Side Stick", url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },
  { key: "C", sound: "Snare", url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" },
];

function App() {
  const [display, setDisplay] = useState("Pressione um botão");
  const [activePad, setActivePad] = useState(null);
  const [volume, setVolume] = useState(1);
  const [power, setPower] = useState(true);
  const [currentBank, setCurrentBank] = useState(bankOne);
  const [darkMode, setDarkMode] = useState(true);

  const playSound = (key) => {
    if (!power) return;

    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();

      const pad = currentBank.find(p => p.key === key);
      if (pad) {
        setDisplay(pad.sound);
        setActivePad(key);

        setTimeout(() => setActivePad(null), 150);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      const padExists = currentBank.some(pad => pad.key === key);
      if (padExists) {
        playSound(key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentBank, power, volume]);

  const togglePower = () => {
    setPower(!power);
    setDisplay(power ? "Power Off" : "Power On");
  };

  const toggleBank = () => {
    if (!power) return;
    if (currentBank === bankOne) {
      setCurrentBank(bankTwo);
      setDisplay("Smooth Piano Kit");
    } else {
      setCurrentBank(bankOne);
      setDisplay("Heater Kit");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div id="drum-machine" className={darkMode ? "dark" : "light"}>
      <div id="display">{display}</div>

      <div className="controls">
        <button
          onClick={togglePower}
          aria-label="Ligar ou desligar bateria"
        >
          Power: {power ? "On" : "Off"}
        </button>

        <button
          onClick={toggleBank}
          disabled={!power}
          aria-label="Mudar banco de sons"
        >
          Change Bank
        </button>

        <button
          onClick={toggleDarkMode}
          aria-label="Alternar tema claro e escuro"
        >
          Tema: {darkMode ? "Escuro" : "Claro"}
        </button>
      </div>

      <div className="volume-slider">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          disabled={!power}
          aria-label="Controle de volume"
        />
        <p>Volume: {Math.round(volume * 100)}%</p>
      </div>

      <div className="drum-pads">
        {currentBank.map((pad) => (
          <div
            key={pad.key}
            id={pad.sound}
            className={`drum-pad ${activePad === pad.key ? "active" : ""} ${!power ? "disabled" : ""}`}
            onClick={() => playSound(pad.key)}
            tabIndex={power ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                playSound(pad.key);
              }
            }}
            aria-label={`Tocar som ${pad.sound} pela tecla ${pad.key}`}
            role="button"
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.url} preload="auto"></audio>
          </div>
        ))}
      </div>
      <footer style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
      By Dev Eyer
    </footer>
    </div>
  );
}

export default App;
