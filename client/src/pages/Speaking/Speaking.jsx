import { IoMdRefresh } from "react-icons/io";
import { FaMicrophoneAlt } from "react-icons/fa";
import styles from "./speaking.module.css";
import { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Speaking() {
  const [topic, setTopic] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaRecorder = useRef(null);
  const mediaStream = useRef(null);
  const chunks = useRef([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    fetchTopic();
  }, []);

  async function fetchTopic() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/speakingtopic`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const retrievedTopic = await response.json();
      setTopic({
        topicId: retrievedTopic._id,
        question: retrievedTopic.topic,
        level: retrievedTopic.level,
      });
    } catch (err) {
      console.log("Failed to fetch speaking topic:", err);
    }
  }

  const startRecording = async () => {
    try {
      resetTranscript();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      chunks.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        SpeechRecognition.stopListening();
      };

      recorder.start();
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!topic) {
    return <p>Loading....</p>;
  }

  return (
    <main>
      {recordedUrl ? (
        <div className={styles.audioContainer}>
          <audio controls src={recordedUrl}>
            Your browser does not support the audio element.
          </audio>
          <p>
            <strong>Your transcript:</strong>{" "}
            {transcript || "No speech detected."}
          </p>
          <div className={styles.actionBtns}>
            <button
              className="btn"
              onClick={() => {
                setRecordedUrl(""), resetTranscript();
              }}
            >
              Discard
            </button>
            <button className="btn">Save</button>
          </div>
        </div>
      ) : (
        <>
          <h1>{topic.question}</h1>
          <button onClick={fetchTopic} className={`btn ${styles.changeTopic}`}>
            <span>
              <IoMdRefresh />
            </span>
            Change Topic
          </button>
          <div className={styles.micElem}>
            <button className={styles.micBtn}>
              <FaMicrophoneAlt />
            </button>
          </div>
          <div className={styles.actionBtns}>
            {isRecording ? (
              <>
                <button className="btn" onClick={stopRecording}>
                  Done
                </button>
              </>
            ) : (
              <button className="btn" onClick={startRecording}>
                Start Recording
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
