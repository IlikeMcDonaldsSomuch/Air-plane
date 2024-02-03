import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Experience } from "./components/Experience";
import { useState , useRef , useEffect } from "react";

function App() {

  const [audio] = useState(new Audio("./song/airplane-fly-by-02.mp3"));
  const audioRef = useRef(audio);
  
  useEffect(() => {
    const audioElement = audioRef.current;

    // Check if the AudioContext is in a suspended state (autoplay policy)
    if (audioElement.paused) {
      // Play the audio to resume the AudioContext
      audioElement.play()
        .then(() => {
          audioElement.loop = true;
          // Audio playback started successfully
        })
        .catch(error => {
          console.error("Error starting audio playback:", error);
        });
    }

    // Cleanup function
    return () => {
      const audioElement = audioRef.current;
      audioElement.pause();
    };
  }, []); // Empty dependency array ensures that this effect runs only once on mount


  return (
    <>
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={20} damping={0.5}>
          <Experience />
        </ScrollControls>
        <EffectComposer>
          <Noise opacity={0} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;
