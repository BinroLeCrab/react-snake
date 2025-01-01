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
            {mute ? 
            <img src="/asset/icon/speaker-x.svg" alt="Son désactivé" />
            : <img src="/asset/icon/speaker-high.svg" alt="Son activé" />}
        </button>
    );
};

export default Mute;