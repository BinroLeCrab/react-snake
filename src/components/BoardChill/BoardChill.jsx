import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import Snake from '../Snake/Snake';
import s from './BoardChill.module.scss';
import { defaultControls } from '../../utils/utils';
import PauseScreen from '../PauseScreen/PauseScreen';
import useStore from '../../utils/store';
import ColorPicker from '../ColorPicker/ColorPicker';
import Canvas from '../Canvas/Canvas';
import Audio from '../Audio/Audio';
import PauseBtn from '../PauseBtn/PauseBtn';

const BoardChill = ({ setPlay }) => {

    const { setSkin } = useStore();

    const [color, setColor] = useState('#FF0000');
    const [snakeData, setSnakeData] = useState([
        [0, 0],
        [12, 0],
        // [24, 0]
    ]);
    const [pixelArray, setPixelArray] = useState([
        {
            coo: [0, 0],
            color: color
        }
    ]);


    const [gamePaused, setGamePaused] = useState(false);
    const speed = 0.2;

    const timer = useRef(0);

    const direction = useRef("RIGHT");
    const canChangeDirection = useRef(true);
    const canvasRef = useRef();

    const isOutOfBorder = (head) => {
        if (head[0] >= 600 || head[1] >= 600 || head[0] < 0 || head[1] < 0) {
            if (head[0] >= 600) {
                head[0] = 0;
            } else if (head[1] >= 600) {
                head[1] = 0;
            } else if (head[0] < 0) {
                head[0] = 588;
            } else if (head[1] < 0) {
                head[1] = 588;
            }
        }
        return head;
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

        isOutOfBorder(head);

        newSnakeData.push(head);
        let queu = newSnakeData.shift();

        let newPixelArray = [...pixelArray];
        const alreadyPixel = pixelArray.find(pixel => pixel.coo[0] === queu[0] && pixel.coo[1] === queu[1]);
        if (alreadyPixel) {
            newPixelArray = pixelArray.filter(pixel => pixel !== alreadyPixel);
        }
        newPixelArray.push({ coo: queu, color: color });

        setPixelArray(newPixelArray);

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
        setSkin(null);
        window.addEventListener("keydown", onKeyDown);
        gsap.ticker.add(gameLoop);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            gsap.ticker.remove(gameLoop);
        }
    }, [snakeData, gamePaused]);

    return (
        <>
            <Audio chill/>
            <ColorPicker color={color} setColor={setColor} />
            <PauseBtn gamePaused={gamePaused} setGamePaused={setGamePaused} />
            <div className={s.board} id='board'>
                < Snake data={snakeData} direction={direction} />
                < Canvas pixels={pixelArray} canvasRef={canvasRef} />
            </div>
            {gamePaused && < PauseScreen setPlay={setPlay} quitPause={quitPause} restart={restart} chill gamePaused={gamePaused} canvasRef={canvasRef} />}
        </>
    );
}

export default BoardChill;