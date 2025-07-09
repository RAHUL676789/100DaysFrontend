import React, { useEffect, useRef, useState } from 'react';
import sample from '../../assest/sample.mp3';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const analyserRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // 🕒 Format time
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // ▶️ Toggle Play/Pause
  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audioCtxRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audio);
      const analyser = audioContext.createAnalyser();

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyser.fftSize = 64;

      audioCtxRef.current = audioContext;
      sourceRef.current = source;
      analyserRef.current = analyser;

    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // 📊 Visualizer draw logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;

    if (!analyser || !isPlaying) return;
         console.log(analyser.frequencyBinCount)
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    console.log(dataArray);

    let animationId;

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) - 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        ctx.fillStyle = `rgb(${100 + barHeight * 1.5}, ${50 + barHeight}, 255)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 2;
      }
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  // 🔄 Sync current time
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMetaData = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setMetaData);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setMetaData);
    };
  }, []);

  // 🎯 Seek bar
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
      {/* 🔈 Audio */}
      <audio controlsList='nofullscreen' ref={audioRef} src={sample} preload="metadata" />

      {/* 🎵 Visualizer Canvas */}
      <canvas
        ref={canvasRef}
        width="600"
        height="150"
        className="w-full mb-4 rounded-md bg-black"
      />

      {/* Time & Progress */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="w-full accent-blue-600 mb-4"
      />

      {/* ▶️ Play Button */}
      <div className="flex justify-center">
        <button
          onClick={togglePlay}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
