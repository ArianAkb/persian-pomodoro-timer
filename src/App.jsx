import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

const MODES = [
  {
    id: "work",
    name: "تمرکز",
    time: 25 * 60,
    color: "bg-[#d4a373] text-[#1a1310]",
  },
  {
    id: "shortBreak",
    name: "استراحت کوتاه",
    time: 5 * 60,
    color: "bg-[#d4a373] text-[#1a1310]",
  },
  {
    id: "longBreak",
    name: "استراحت بلند",
    time: 15 * 60,
    color: "bg-[#d4a373] text-[#1a1310]",
  },
];

const toPersianDigits = (n) =>
  n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export default function App() {
  const [modeIndex, setModeIndex] = useState(0);
  const currentMode = MODES[modeIndex];
  const [timeLeft, setTimeLeft] = useState(currentMode.time);
  const [isActive, setIsActive] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(
    new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"),
  );
  const chimeRef = useRef(
    new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3"),
  );

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      chimeRef.current.play();
      if (currentMode.id === "work") setPomodoros((c) => c + 1);
      setIsActive(false);
      handleNextMode();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentMode]);

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
  }, [volume]);

  const toggleMusic = () => {
    if (isMusicPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsMusicPlaying(!isMusicPlaying);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${toPersianDigits(m.toString().padStart(2, "0"))}:${toPersianDigits(sec.toString().padStart(2, "0"))}`;
  };

  const changeMode = (i) => {
    setModeIndex(i);
    setTimeLeft(MODES[i].time);
    setIsActive(false);
  };

  const handleNextMode = () => changeMode((modeIndex + 1) % MODES.length);

  return (
    <div
      className="min-h-screen p-8 md:p-20 font-vazir text-[#d4a373] bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(26, 19, 16, 0.85), rgba(26, 19, 16, 0.85)), url(https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop)",
      }}
      dir="rtl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Card */}
        <div className="md:col-span-2 border-[2px] border-[#d4a373]/30 p-10 flex flex-col justify-between">
          <h1 className="text-5xl font-bold mb-12">تایمر پومودورو</h1>

          <div className="text-[120px] font-black tracking-tighter leading-none mb-12">
            {formatTime(timeLeft)}
          </div>

          <div className="flex gap-4">
            {MODES.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => changeMode(idx)}
                className={`px-8 py-3 border-[2px] border-[#d4a373]/30 transition-all duration-300 ${modeIndex === idx ? `${m.color}` : "hover:border-[#d4a373] hover:bg-[#d4a373]/10"}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="border-[2px] border-[#d4a373]/30 p-10 flex flex-col justify-between">
          <div className="text-xl font-bold font-[Geist]"></div>
          <p className="text-3xl font-bold mt-8">
            تعداد پومودورو: <br /> {toPersianDigits(pomodoros)} 🍅
          </p>

          <div className="mt-auto pt-10 border-t-[2px] border-[#d4a373]/30">
            <button
              onClick={() => {
                setIsActive(false);
                setTimeLeft(currentMode.time);
              }}
              className="w-full py-4 border-[2px] border-[#d4a373]/30 mb-4 hover:border-[#d4a373] hover:bg-[#d4a373]/10"
            >
              بازنشانی
            </button>
            <button
              onClick={() => setIsActive(!isActive)}
              className="w-full py-4 bg-[#d4a373] text-[#1a1310] font-bold text-lg hover:bg-[#d4a373]/80"
            >
              {isActive ? "توقف" : "شروع"}
            </button>
          </div>
        </div>
      </div>

      {/* Music Player */}
      <div className="fixed bottom-8 left-8  p-6 flex items-center gap-6">
        <button onClick={toggleMusic} className="text-[#d4a373]">
          {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32 accent-[#d4a373]"
        />
      </div>
    </div>
  );
}
