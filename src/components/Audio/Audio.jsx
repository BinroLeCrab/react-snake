import { useEffect, useRef } from "react";
import useStore from "../../utils/store";
import s from "./Audio.module.scss";

const Audio = ({chill}) => {

    const { mute } = useStore();
    const audioRef = useRef();

    useEffect(() => {
        if (!mute) {
            if (chill) {
                audioRef.current.volume = 0.5;
            } else {
                audioRef.current.volume = 0.3;
            }
        }
    }, [mute]);

    return (
        <audio className={s.audio} ref={audioRef} controls loop muted={mute} autoPlay>
            {
                chill
                    ? <source src="audio/immaculate_vibes.mp3" type="audio/mpeg" />
                    : <source src="audio/Flower_Garden.mp3" type="audio/mpeg" />
            }
            Your browser does not support the audio element.
        </audio>
    );
};

export default Audio;