import useStore from "../../utils/store";
import s from "./PauseBtn.module.scss";

const PauseBtn = ({gamePaused, setGamePaused}) => {

    const handleClick = (e) => {
        setGamePaused(!gamePaused);
        document.activeElement.blur();
    };

    return (
        <button className={s["Pause-btn"]} onClick={handleClick}>
            {gamePaused ? 
            <img src="/asset/icon/play.svg" alt="Reprendre" />
            : <img src="/asset/icon/pause.svg" alt="Mettre en pause" />}
        </button>
    );
};

export default PauseBtn;