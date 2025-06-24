import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import styles from "./listening.module.css";
import { MdOutlineReplay10, MdOutlineForward10 } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Practice() {
  const location = useLocation();
  const playerRef = useRef(null);

  const options = {
    height: "300",
    width: "520",
    playerVars: {
      autoplay: 0,
      fs: 0,
      cc_load_policy: 3,
      controls: 0,
      rel: 0,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const seek = (seconds) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + seconds, true);
    }
  };

  const rawTranscript = location.state.transcript;
  const transcriptWords = rawTranscript.replace(/[^\w\s']/g, "").split(" ");
  const wordCount = transcriptWords.length;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(transcriptWords[0]);

  const [incorrectWords, setIncorrectWords] = useState(new Set());
  const [isWordIncorrect, setIsWordIncorrect] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const transcriptRef = useRef(null);

  useEffect(() => {
    const container = transcriptRef.current;
    container.innerHTML = "";

    rawTranscript.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.id = `char-${index}`;
      span.textContent = char === " " ? " " : "_";
      container.appendChild(span);
    });
  }, []);

  const handleKey = (e) => {
    const typedKey = e.key.toLowerCase();

    if (typedKey.length !== 1) return;

    const expectedChar = rawTranscript[currentIndex]?.toLowerCase();

    const span = document.getElementById(`char-${currentIndex}`);
    if (!span) return;

    if (typedKey === expectedChar) {
      span.textContent = rawTranscript[currentIndex];
      span.style.backgroundColor = "transparent";
      span.style.textDecoration = "none";
      setCurrentIndex((prev) => prev + 1);
    } else {
      span.textContent = typedKey;
      span.style.backgroundColor = "red";
      setIncorrectWords((prev) => new Set(prev).add(currentWord));
    }

    if (typedKey === expectedChar && typedKey === " ") {
      e.target.value = "";
      setCurrentWordIndex((prev) => {
        const newIndex = prev + 1;
        setCurrentWord(transcriptWords[newIndex]);
        return newIndex;
      });
    }
    console.log(currentWordIndex);
  };

  return (
    <main className={styles.listeningPractice}>
      <h1>
        Practice your listening skills by typing the transcript alongside:
      </h1>
      <p>
        Type the words that you hear below the video in the input box. Pause the
        video whenever you need to. You can also replay the video and skip.
        After completing transcript, click on the submit button, and check your
        score. You can also check the full script from the button at bottom, but
        it is recommended that you first try it yourself.
      </p>
      <div className={styles.videoPlayer}>
        <YouTube
          videoId={location.state.videoId}
          opts={options}
          onReady={onReady}
          className={styles.youtubeVideo}
        />
        <div className={styles.controls}>
          <button onClick={() => seek(-10)}>
            <MdOutlineReplay10 />
          </button>
          <button onClick={() => seek(10)}>
            <MdOutlineForward10 />
          </button>
        </div>
      </div>
      <div className={styles.practicePlayground}>
        <div ref={transcriptRef} className={styles.transcriptText}></div>
        <input
          type="text"
          placeholder="Type here...."
          className={styles.typingInput}
          onKeyDown={handleKey}
        />
        <button className={styles.submitTranscript}>
          <Link
            to="score"
            state={{
              wrongWords: incorrectWords,
              totalWords: wordCount,
              triedWords: currentWordIndex,
            }}
          >
            Submit
          </Link>
        </button>
      </div>
      <button className={`btn ${styles.fullScript}`}>
        <Link to="transcript" state={{ transcript: rawTranscript }}>
          <GiNotebook />
          Load Full Transcript
        </Link>
      </button>
    </main>
  );
}
