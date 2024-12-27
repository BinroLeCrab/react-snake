import Board from "./components/Board/Board";
import Toggle from "./components/Toggle/Toggle";
import {useDropzone} from 'react-dropzone';
import useStore from "./utils/store";
import Mute from "./components/Mute/Mute";

function App() {
  const { skin, setSkin, mute, setMute } = useStore();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept:  {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/svg": [],
      "image/gif": [],
    },
    maxFiles: 1,
    onDrop: (file) => onDrop(file),
    // noClick: true,
  });

  const onDrop = (file) => {
    console.log(file);
    const src = URL.createObjectURL(file[0]);
    setSkin(src);
  };

  return (
    <div>
      <Mute />
      <div className="flashbang"></div>
      <Board />
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {skin && <img src={skin} alt=""/>}
      </div>
    </div>
  );
}

export default App;
