import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import Snake from '../Snake/Snake';
import s from './Board.module.scss';
import Food from '../Food/Food';
import { generateRandomCoordinates } from '../../utils/utils';
import GameOver from '../GameOver/GameOver';
import PauseScreen from '../PauseScreen/PauseScreen';

const Board = () => {

    const [snakeData, setSnakeData] = useState([
        [0, 0],
        [10, 0],
    ]);
    const [foodArray, setFoodArray] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);
    const [speed, setSpeed] = useState(0.15);

    const timer = useRef(0);
    const foodTimer = useRef(0);
    const direction = useRef("RIGHT");
    const canChangeDirection = useRef(true);

    const gameIsOver = () => {
        console.log("Game Over");

        gsap.ticker.remove(gameLoop);
        setGameOver(true);
    };

    const isOutOfBorder = () => {
        const head = snakeData[snakeData.length - 1];
        // console.log(head);

        if (head[0] >= 500 || head[1] >= 500 || head[0] < 0 || head[1] < 0) {
            return true;
        } else {
            return false;
        }
    };

    const hasEatenFood = () => {
        const head = snakeData[snakeData.length - 1];

        const food = foodArray.find(
            (_food) => _food.x === head[0] && _food.y === head[1]
        );

        if (food) {

            const newFoodArray = foodArray.filter(_food => _food !== food);
            setFoodArray(newFoodArray);

            return true;
        } else {
            return false;
        }
    }

    const hasCollapsed = () => {
        let snake = [...snakeData];
        let head = snake[snake.length - 1];
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
                head = [head[0], head[1] - 10];

                break;
            case "DOWN":
                head = [head[0], head[1] + 10];

                break;
            case "LEFT":
                head = [head[0] - 10, head[1]];

                break;
            case "RIGHT":
                head = [head[0] + 10, head[1]];

                break;

            default:
                break;
        }

        newSnakeData.push(head);
        newSnakeData.shift();

        const snakeCollapsed = hasCollapsed();
        const outOfBorder = isOutOfBorder();
        const snakeEatFood = hasEatenFood();

        if (outOfBorder || snakeCollapsed) {
            gameIsOver();
        } else {
            if (snakeEatFood) {
                newSnakeData.unshift([]);
                setScore(score + 10);
                if (speed > 0.05){
                    setSpeed(speed - 0.01);
                }
            }
            setSnakeData(newSnakeData);
        }
    };

    const onKeyDown = (e) => {

        if (canChangeDirection.current === false) return;
        canChangeDirection.current = false;

        switch (e.keyCode) {
            case 32: // Space
                setGamePaused(!gamePaused);
                break;
            case 38: // Up
            case 90: // Z
                if (direction.current !== "DOWN") {
                    direction.current = "UP";
                }
                break;
            case 40: // Down
            case 83: // S
                if (direction.current !== "UP") {
                    direction.current = "DOWN";
                }
                break;
            case 37: // Left
            case 81: // Q
                if (direction.current !== "RIGHT") {
                    direction.current = "LEFT";
                }
                break;
            case 39: // Rigth
            case 68: // D
                if (direction.current !== "LEFT") {
                    direction.current = "RIGHT";
                }
                break;

            default:
                break;
        }
    };

    const addFood = () => {
        //génération de coordonée
        const coordinates = generateRandomCoordinates();

        //mise à jour du state
        setFoodArray((oldFoodArray) => [...oldFoodArray, coordinates]);
    };

    const gameLoop = (time, deltaTime, frame) => {
        // console.log(time, deltaTime, frame);

        timer.current += deltaTime * 0.001;
        foodTimer.current += deltaTime * 0.001;

        if (foodTimer.current > 3 && foodArray.length < 5) {
            foodTimer.current = 0;
            addFood();
        }

        if (timer.current > speed) {
            // console.log("Move snake");
            timer.current = 0;
            moveSnake();
            canChangeDirection.current = true;
        }
    };

    const replay = () => {
        // replay game
        setGameOver(false);
        setFoodArray([]);
        setSnakeData([
            [0, 0],
            [10, 0],
        ]);
        setSpeed(0.2);
        setScore(0);

        direction.current = "RIGHT";
        timer.current = 0;
        foodTimer.current = 0;
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        gsap.ticker.add(gameLoop);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            gsap.ticker.remove(gameLoop);
        }
    }, [snakeData]);

    return (
        <div className={s.board}>
            < Snake data={snakeData} />
            {foodArray.map((coordinates) => (
                < Food key={coordinates.id} coordinates={coordinates} />
            ))}

            <span className={s.score}>Score: {score}</span>

            {gameOver ? < GameOver score={score} replay={replay} /> : gamePaused ? < PauseScreen/> : null}

        </div>
    );
}

export default Board;

// 32 -> space bar