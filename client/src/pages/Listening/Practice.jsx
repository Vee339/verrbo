import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import styles from "./listening.module.css";
import { MdOutlineReplay10, MdOutlineForward10 } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Practice() {
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

  const rawTranscript =
    "It used to be thought that being bilingual was a bad thing that it would confuse or hold people back especially children. It turns out we couldn't have been more wrong. Learning new languages is an exercise of the mind. It's the mental equivalent of going to a gym every day. In the bilingual brain, all our languages are active all at the same time. The continue effort of suppressing a language when speaking another along with a mental challenge that comes with regularly switching between languages exercises our brain. It improves our concentration, problem solving, memory, and in turn our creativity. It's now widely accepted that there are huge benefits to being bilingual. A key breakthrough came back in 2007 in Toronto when Ellen B alisto and her team made a discovery that shook the scientific community and has massive real world implications. It was the first study which suggested that bilingual people, people who speak more than one language, develop dementia four to four and a half years later than those who don't. It was a powerful confirmation of the idea of cognitive reserve. Now, what is cognitive Reserve? Cognitive Reserve is the idea that people develop a reserve of thinking abilities and this protects them against losses that can occur through aging and disease. As well as delaying the onset of dementia bilingual people have been shown to recover significantly better after a stroke. Learning anything new helps build cognitive Reserve. But there's something special about language. Language is particularly Broad and complex. It affects ideas and concepts perception, different sounds; the more complex certain skill is the more likely it is to have a positive effect on Cognitive Reserve. So when is the best time to learn a new language? Well, here's part of the answer. The brain is a complex set of new networks. When you're learning a new language as a child you're building new networks. But when you learn a language later in life you have to modify the existing networks and make more connections because learning languages later in life can be more challenging, the benefits can also be greater. But a 2023 study at Great Orman Street suggests this is just part of the story. So we invited three groups of children that were aged 8 to 10 and we had a group of children who were monolingual, a group of children who had early exposure to Greek and English from birth, they were our early bilinguals and finally, we had a group who had been exposed to English between the ages of 2 and five and they were our later bilinguals. So what we did that no one had done before is that we asked the children to line the scanner while doing nothing and just staring at a cross and during this we measured their brain activity so what we found that was really exciting for us is that our early bilingual group had the strongest connectivity in a network at rest and these group of regions are regions that light up when we're doing nothing and just mind wandering. A little bit like if you're going to the gym every day your muscles might look bigger at rest where similarly your brain might be better connected at rest because you are learning a language early and this is something no one had found before and there's more. One lesser known behavioral effect of bilingualism in both children and adults is the ability to see the other people's perspective or to understand that it is possible to have different points of view. Recent Studies have also found that people tend to react more emotionally in their first language and more rational in a more abstract way in the second and the way it is usually explained is that the first language is the one which we use to speak with family, with friends, in informal settings. The second language is usually learned at school, at the University, at work. Scientists are discovering new upsides to be in bilingual all the time and it's not just our brains that benefit. Learning new languages and speaking more than one language is very important not only for individuals but also for societies. Learning new languages can open doors to new cultural experiences, life opportunities, different people, different communities, and different ways of seeing the world.";

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
          videoId="WSUj3PRvzzg"
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
