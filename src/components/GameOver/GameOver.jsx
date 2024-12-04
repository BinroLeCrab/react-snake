import Submit from '../Submit/Submit';
import s from './GameOver.module.scss';

const GameOver = ({ replay, score, death }) => {
    return (
        <div className={s.gameOver}>
            <h1>Game Over</h1>
            <p>Score: {score}</p>
            <button onClick={replay}>Replay</button>
            <Submit score={score} death={death} />
        </div>
    )
}

export default GameOver;