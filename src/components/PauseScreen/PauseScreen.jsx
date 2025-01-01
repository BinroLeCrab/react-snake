import CanvasImage from '../CanvasImage/CanvasImage';
import s from './PauseScreen.module.scss';

const PauseScreen = ({ quitPause, setPlay, restart, chill, gamePaused, canvasRef }) => {
    return (
        <>
            <div className={s.pauseScreen}>
                <h1 className={s["pauseScreen__title"]}>Jeu en pause</h1>
                <div className={s["pauseScreen__content"]}>
                    {chill && (
                        <div className={s["pauseScreen__column"]}>
                            <CanvasImage gamePaused={gamePaused} canvasRef={canvasRef} />
                        </div>
                    )}
                    <div className={`${s["pauseScreen__column"]} ${s["pauseScreen__column--btn"] }`}>
                        <button onClick={quitPause}>Reprendre</button>
                        {chill && <button onClick={restart}>Recommencer</button>}
                        <button onClick={() => setPlay(false)}>Quitter</button>
                        <p>Ou pressez la touche espace pour reprendre.</p>
                    </div>

                </div>
            </div>
            <div className={s.crt}></div>
        </>
    );
}

export default PauseScreen;