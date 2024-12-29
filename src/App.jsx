import Board from "./components/Board/Board";
import Toggle from "./components/Toggle/Toggle";
import { useDropzone } from 'react-dropzone';
import useStore from "./utils/store";
import Mute from "./components/Mute/Mute";
import { useState } from "react";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import BoardChill from "./components/BoardChill/BoardChill";

function App() {

  const [play, setPlay] = useState(false);

  return (
    <div>
      <Mute />
      {play === "classic" ?
        <Board setPlay={setPlay} />
        : play === "chill" ? <BoardChill setPlay={setPlay} />
        : <HomeScreen setPlay={setPlay} />
      }

    </div>
  );
}

export default App;
