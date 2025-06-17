import { useLocation } from "react-router-dom";

export default function Transcript() {
  let location = useLocation();
  return (
    <main>
      <h1>Complete Transcript</h1>
      <p>{location.state.transcript}</p>
    </main>
  );
}
