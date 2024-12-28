import { useEffect, useRef } from "react";
import s from "./Canvas.module.scss";

const Canvas= ({pixels}) => {
    const canvasRef = useRef();

    useEffect(() => {
        var ctx = canvasRef.current.getContext("2d");

        ctx.clearRect(0, 0, 600, 600);
        
        pixels.map((pixel) => {
            ctx.fillStyle = pixel.color;
            ctx.fillRect(pixel.coo[0], pixel.coo[1], 12, 12);
        });
    }, [pixels]);

    return (
        <canvas ref={canvasRef} className={s.canvas} width="600" height="600"></canvas>
    );
};

export default Canvas;