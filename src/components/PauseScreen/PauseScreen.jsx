import s from './PauseScreen.module.scss';

const PauseScreen = ({quitPause, setPlay}) => {
    return (
        <>
        <div className={s.pauseScreen}>
            <h1>Jeu en pause</h1>
            <button onClick={quitPause}>Reprendre</button>
            <button onClick={() => setPlay(false)}>Quitter</button>
            <p>Ou presser la touche espace pour reprendre.</p>
        </div>
        <div className={s.crt}></div>
        </>
    );
}

export default PauseScreen;