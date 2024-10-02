import s from './GameOver.module.scss';

const GameOver = ({replay, score}) => {
    return (
        <div className={s.gameOver}>
            <h1>Game Over</h1>
            <p>Score: {score}</p>
            <button onClick={replay}>Replay</button>
        </div>
    )
}

export default GameOver;