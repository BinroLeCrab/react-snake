import CrtFilter from '../CrtFilter/CrtFilter';
import Submit from '../Submit/Submit';
import s from './GameOver.module.scss';

const GameOver = ({ replay, score, death, setPlay }) => {
    return (
        <>
            <div className={s.gameOver}>
                <h1 className={s["gameOver__title"]}>Game Over</h1>
                <div className={s["gameOver__content"]}>
                    <div className={s["gameOver__row"]}>
                        <p>Score: {score}</p>
                        <Submit score={score} death={death} />
                    </div>
                    <div className={`${s["gameOver__row"]} ${s["gameOver__row--btn"] }`}>
                        <button onClick={replay}>Rejouer</button>
                        <button onClick={() => setPlay(false)}>Quitter</button>
                    </div>
                </div>
            </div>
            <CrtFilter />
        </>
    )
}

export default GameOver;