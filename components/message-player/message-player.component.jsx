import { faPause, faPlay, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useRef, useState } from "react";
import styles from "./message-player.module.css";

const MessagePlayer = ({ duration }) => {
  const [timePassed, setTimePassed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timer = useRef();
  const audio = useRef();

  const decorateTime = (time) => {
    return `${
      Math.floor(time / 60) < 10
        ? "0".concat(Math.floor(time / 60))
        : Math.floor(time / 60)
    }:${time % 60 < 10 ? "0".concat(time % 60) : time % 60}`;
  };

  useEffect(() => {
    if (timePassed >= parseInt(duration)) {
      audio.current.pause();
      setIsPlaying(false);
      clearInterval(timer.current);
      return;
    }
  }, [timePassed]);

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    if (isPlaying) {
      timer.current = setInterval(() => {
        setTimePassed(Math.round(audio.current?.currentTime));
      }, 1000);
    }
  }, [isPlaying]);

  const togglePlayer = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audio.current.play();
    } else {
      setIsPlaying(false);
      audio.current.pause();
    }
  };

  const handleScroll = (e) => {
    audio.current.currentTime = e.target.value;
    setTimePassed(e.target.value);
  };

  return (
    <div className={styles.player}>
      <FontAwesomeIcon
        className={styles.playerIcon}
        onClick={togglePlayer}
        icon={isPlaying ? faPause : faPlay}
      />
      <div className={styles.timePassed}>{decorateTime(timePassed)}</div>
      <input
        className={styles.slider}
        value={timePassed}
        onChange={handleScroll}
        min="0"
        max={duration}
        type="range"
      />
      <audio src="/audio.mp3" ref={audio}></audio>
      <div className={styles.duration}>{decorateTime(duration)}</div>
      <a href="/audio.mp3" download>
        <FontAwesomeIcon className={styles.playerIcon} icon={faSave} />
      </a>
    </div>
  );
};

export default MessagePlayer;
