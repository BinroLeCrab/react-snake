import useStore from "../../utils/store";
import s from "./Mute.module.scss";

const Mute = () => {

    const { mute, setMute } = useStore();

    return (
        <button className={s["Mute-btn"]} onClick={() => {setMute(mute)}}>
            {mute ? "Unmute" : "Mute"}
        </button>
    );
};

export default Mute;