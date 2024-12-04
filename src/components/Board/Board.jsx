import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import Snake from '../Snake/Snake';
import s from './Board.module.scss';
import Item from '../Item/Item';
import { generateRandomCoordinates, defaultControls, reversedControls, flashUser, mlem, triggerMode, wizz } from '../../utils/utils';
import GameOver from '../GameOver/GameOver';
import PauseScreen from '../PauseScreen/PauseScreen';
import useStore from '../../utils/store';

const Board = () => {

    const { mode, removeMode } = useStore();

    const [snakeData, setSnakeData] = useState([
        [0, 0],
        [12, 0],
    ]);
    const [foodArray, setFoodArray] = useState([]);
    const [trapArray, setTrapArray] = useState([]);

    const [score, setScore] = useState(0);
    const [death, setDeath] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);
    const [speed, setSpeed] = useState(0.15);

    const timer = useRef(0);
    const foodTimer = useRef(0);
    const trapTimer = useRef(0);

    const direction = useRef("RIGHT");
    const canChangeDirection = useRef(true);

    const gameIsOver = () => {
        console.log("Game Over");

        gsap.ticker.remove(gameLoop);

        setDeath(death + 1);
        setGameOver(true);
    };

    const isOutOfBorder = (head) => {
        // const head = snakeData[snakeData.length - 1];
        // console.log(head);

        if (head[0] >= 600 || head[1] >= 600 || head[0] < 0 || head[1] < 0) {
            return true;
        } else {
            return false;
        }
    };

    const hasEatenItem = ({ getter, setter }) => {
        const head = snakeData[snakeData.length - 1];

        const item = getter.find(
            (_item) => _item.x === head[0] && _item.y === head[1]
        );

        if (item) {

            const newItemArray = getter.filter(_item => _item !== item);
            setter(newItemArray);

            return true;
        } else {
            return false;
        }
    }

    const hasCollapsed = (head) => {
        let snake = [...snakeData];
        // let head = snake[snake.length - 1];
        snake.pop();

        for (let i = 0; i < snake.length; i++) {
            if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
                return true;
            }
        }

        return false;
    };

    const moveSnake = () => {
        let newSnakeData = [...snakeData];
        let head = newSnakeData[newSnakeData.length - 1];

        switch (direction.current) {
            case "UP":
                head = [head[0], head[1] - 12];

                break;
            case "DOWN":
                head = [head[0], head[1] + 12];

                break;
            case "LEFT":
                head = [head[0] - 12, head[1]];

                break;
            case "RIGHT":
                head = [head[0] + 12, head[1]];

                break;

            default:
                break;
        }

        newSnakeData.push(head);
        newSnakeData.shift();

        const snakeCollapsed = hasCollapsed(head);
        const outOfBorder = isOutOfBorder(head);
        const snakeEatFood = hasEatenItem({
            getter: foodArray,
            setter: setFoodArray
        });

        const snakeEatTrap = hasEatenItem({
            getter: trapArray,
            setter: setTrapArray
        });

        if (outOfBorder || snakeCollapsed) {
            gameIsOver();
        } else {
            if (snakeEatTrap === true) {
                // trap execution logic
                // const effects = [flashUser, wizz];
                const effects = [flashUser, wizz];

                const selectedEffect = effects[Math.floor(Math.random() * effects.length)];

                selectedEffect();
            }

            if (snakeEatFood === true) {

                mlem();

                newSnakeData.unshift([]);
                setScore(score + 10);
                if (speed > 0.05) {
                    setSpeed(speed - 0.01);
                    console.log("vitesse : ", speed);
                }
            }
            setSnakeData(newSnakeData);
        }
    };

    const onKeyDown = (e) => {

        if (canChangeDirection.current === false) return;
        canChangeDirection.current = false;

        mode.includes("reversed")
            ? reversedControls(e, direction, gamePaused, setGamePaused)
            : defaultControls(e, direction, gamePaused, setGamePaused);

        // switch (e.keyCode) {
        //     case 32: // Space
        //         setGamePaused(gamePaused ? false : true);
        //         break;
        //     case 38: // Up
        //     case 90: // Z
        //         if (direction.current !== "DOWN" && gamePaused === false) {
        //             direction.current = "UP";
        //         }
        //         break;
        //     case 40: // Down
        //     case 83: // S
        //         if (direction.current !== "UP" && gamePaused === false) {
        //             direction.current = "DOWN";
        //         }
        //         break;
        //     case 37: // Left
        //     case 81: // Q
        //         if (direction.current !== "RIGHT" && gamePaused === false) {
        //             direction.current = "LEFT";
        //         }
        //         break;
        //     case 39: // Rigth
        //     case 68: // D
        //         if (direction.current !== "LEFT" && gamePaused === false) {
        //             direction.current = "RIGHT";
        //         }
        //         break;

        //     default:
        //         break;
        // }
    };

    const addItem = ({ getter, setter }) => {
        //génération de coordonée
        const coordinates = generateRandomCoordinates(mode);

        const superArray = [...foodArray, ...trapArray];

        const itemAlreadyExistsHere = superArray.some(
            (item) => item.x === coordinates.x && coordinates.y === item.y
        );

        if (itemAlreadyExistsHere) {
            addItem({ getter, setter });
            return;
        }

        //mise à jour du state
        setter((oldArray) => [...oldArray, coordinates]);
    };

    const gameLoop = (time, deltaTime, frame) => {
        // console.log(time, deltaTime, frame);

        timer.current += deltaTime * 0.001;
        foodTimer.current += deltaTime * 0.001;
        trapTimer.current += deltaTime * 0.001;

        if (foodTimer.current > 3 && foodArray.length < 5) {
            foodTimer.current = 0;
            if (!gamePaused) addItem({ getter: foodArray, setter: setFoodArray });
        }

        if (trapTimer.current > 5 && trapArray.length < 3) {
            trapTimer.current = 0;
            if (!gamePaused) addItem({ getter: trapArray, setter: setTrapArray });
        }

        if (timer.current > (mode.includes("impossible") ? 0.02 : speed)) {
            // console.log("Move snake");
            timer.current = 0;
            if (!gamePaused) moveSnake();
            canChangeDirection.current = true;
        }
    };

    const replay = () => {
        // replay game
        // removeMode("impossible");
        // removeMode("corner");

        setGameOver(false);
        setGamePaused(false);
        setFoodArray([]);
        setTrapArray([]);
        setSnakeData([
            [0, 0],
            [12, 0],
        ]);
        setSpeed(0.2);
        setScore(0);

        direction.current = "RIGHT";
        timer.current = 0;
        foodTimer.current = 0;
    };

    const quitPause = () => {
        setGamePaused(false);
    }

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        gsap.ticker.add(gameLoop);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            gsap.ticker.remove(gameLoop);
        }
    }, [snakeData, gamePaused]);

    return (
        <>
            <div className={s.board} id='board'>
                < Snake data={snakeData} />

                {foodArray.map((coordinates) => (
                    < Item key={coordinates.id} coordinates={coordinates} type="food" />
                ))}

                {trapArray.map((coordinates) => (
                    < Item key={coordinates.id} coordinates={coordinates} type="trap" />
                ))}
                <span className={s.score}>Score: {score}</span>
                <span className={s.death}>Death: {death}</span>
            </div>
            {gameOver ? < GameOver score={score} death={death} replay={replay} /> : gamePaused ? < PauseScreen quitPause={quitPause} /> : null}
        </>
    );
}

export default Board;

// 32 -> space