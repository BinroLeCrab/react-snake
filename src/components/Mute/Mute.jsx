import useStore from "../../utils/store";
import s from "./Mute.module.scss";

const Mute = () => {

    const { mute, setMute } = useStore();

    const handleClick = (e) => {
        setMute(mute);
        document.activeElement.blur();
    };

    return (
        <button className={s["Mute-btn"]} onClick={handleClick}>
            {mute ? "Unmute" : "Mute"}
        </button>
    );
};

export default Mute;