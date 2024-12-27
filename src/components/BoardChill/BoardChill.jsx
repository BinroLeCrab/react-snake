import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import Snake from '../Snake/Snake';
import s from './BoardChill.module.scss';
import Item from '../Item/Item';
import { generateRandomCoordinates, defaultControls, reversedControls, flashUser, mlem, triggerMode, wizz } from '../../utils/utils';
import GameOver from '../GameOver/GameOver';
import PauseScreen from '../PauseScreen/PauseScreen';
import {useDropzone} from 'react-dropzone';
import useStore from '../../utils/store';
import Pixel from '../Pixel/Pixel';

const BoardChill = ({setPlay}) => {

    const { skin, setSkin, mode, mute } = useStore();

    const [snakeData, setSnakeData] = useState([
        [0, 0],
        [12, 0],
        // [24, 0]
    ]);
    const [pixelArray, setPixelArray] = useState([
        {
            coo: [0,0],
            color: "red"
        }
    ]);
    const [color, setColor] = useState("red");

    const [gamePaused, setGamePaused] = useState(false);
    const speed = 0.2;

    const timer = useRef(0);

    const direction = useRef("RIGHT");
    const canChangeDirection = useRef(true);

    // const isOutOfBorder = (head) => {
    //     if (head[0] >= 600 || head[1] >= 600 || head[0] < 0 || head[1] < 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };


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
        let queu = newSnakeData.shift();

        let newPixelArray = [...pixelArray];
        const alreadyPixel = pixelArray.find(pixel => pixel.coo[0] === queu[0] && pixel.coo[1] === queu[1]);
        if(alreadyPixel) {
            newPixelArray = pixelArray.filter(pixel => pixel !== alreadyPixel);
        }
        newPixelArray.push({coo: queu, color: color});

        setPixelArray(newPixelArray);
        console.log(newPixelArray);

        setSnakeData(newSnakeData);
    };

    const onKeyDown = (e) => {

        if (canChangeDirection.current === false) return;
        canChangeDirection.current = false;

        defaultControls(e, direction, gamePaused, setGamePaused);
    };

    const gameLoop = (time, deltaTime, frame) => {

        timer.current += deltaTime * 0.001;

        if (timer.current > (speed)) {
            timer.current = 0;
            if (!gamePaused) moveSnake();
            canChangeDirection.current = true;
        }
    };

    const restart = () => {
        // restart game
        setGamePaused(false);
        setPixelArray([]);
        setSnakeData([
            [0, 0],
            [12, 0],
        ]);

        direction.current = "RIGHT";
        timer.current = 0;
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
                < Snake data={snakeData} direction={direction} />

                {pixelArray.map((pixel, key) => (
                    <Pixel key={key} x={pixel.coo[0]} y={pixel.coo[1]} color={pixel.color} />
                ))}
            </div>
            {gamePaused && < PauseScreen setPlay={setPlay} quitPause={quitPause} restart={restart} />}
        </>
    );
}

export default BoardChill;