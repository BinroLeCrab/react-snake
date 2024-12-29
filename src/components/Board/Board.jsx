import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import Snake from '../Snake/Snake';
import s from './Board.module.scss';
import Item from '../Item/Item';
import { generateRandomCoordinates, defaultControls, reversedControls, flashUser, mlem, triggerMode, wizz } from '../../utils/utils';
import GameOver from '../GameOver/GameOver';
import PauseScreen from '../PauseScreen/PauseScreen';
import {useDropzone} from 'react-dropzone';
import useStore from '../../utils/store';
import Audio from '../Audio/Audio';

const Board = ({setPlay}) => {

    const { skin, setSkin, mode, mute } = useStore();

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
    const [speed, setSpeed] = useState(0.2);

    const timer = useRef(0);
    const foodTimer = useRef(0);
    const trapTimer = useRef(0);

    const direction = useRef("RIGHT");
    const canChangeDirection = useRef(true);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [],
            "image/png": [],
            "image/webp": [],
            "image/svg": [],
            "image/gif": [],
        },
        maxFiles: 1,
        onDrop: (file) => onDrop(file),
        // noClick: true,
    });

    const onDrop = (file) => {
        console.log(file);
        const src = URL.createObjectURL(file[0]);
        setSkin(src);
    };

    const gameIsOver = () => {
        console.log("Game Over");

        gsap.ticker.remove(gameLoop);

        setDeath(death + 1);
        setGameOver(true);
    };

    const isOutOfBorder = (head) => {
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
                const effects = [flashUser, wizz];

                const selectedEffect = effects[Math.floor(Math.random() * effects.length)];

                selectedEffect(mute);
                score > 0 && setScore(score - 5);
            }

            if (snakeEatFood === true) {

                mlem(mute);

                newSnakeData.unshift(newSnakeData[0]);
                setScore(score + 10);
                if (speed > 0.05) {
                    setSpeed(speed - 0.01);
                }
            }
            setSnakeData(newSnakeData);
        }
    };

    const onKeyDown = (e) => {

        if (canChangeDirection.current === false) return;
        canChangeDirection.current = false;

        defaultControls(e, direction, gamePaused, setGamePaused);
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

        if (timer.current > (speed)) {
            timer.current = 0;
            if (!gamePaused) moveSnake();
            canChangeDirection.current = true;
        }
    };

    const replay = () => {
        // replay game

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
            <Audio />
            <div className="flashbang"></div>

            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                {skin && <img src={skin} style={{ width: "30px" }} alt="" />}
            </div>

            <div className={s.board} id='board'>
                < Snake data={snakeData} direction={direction} />

                {foodArray.map((coordinates) => (
                    < Item key={coordinates.id} coordinates={coordinates} type="food" />
                ))}

                {trapArray.map((coordinates) => (
                    < Item key={coordinates.id} coordinates={coordinates} type="trap" />
                ))}
                <span className={s.score}>Score: {score}</span>
                <span className={s.death}>Death: {death}</span>
            </div>
            {gameOver ? < GameOver score={score} death={death} replay={replay} setPlay={setPlay} /> : gamePaused ? < PauseScreen setPlay={setPlay} quitPause={quitPause} /> : null}
        </>
    );
}

export default Board;