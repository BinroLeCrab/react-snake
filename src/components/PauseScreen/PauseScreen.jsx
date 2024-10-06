import s from './PauseScreen.module.scss';

const PauseScreen = ({quitPause}) => {
    return (
        <div className={s.pauseScreen}>
            <h1>Jeu en pause</h1>
            <button onClick={quitPause}>Reprendre</button>
            <p>Ou presser la touche espace pour reprendre.</p>
        </div>
    );
}

export default PauseScreen;