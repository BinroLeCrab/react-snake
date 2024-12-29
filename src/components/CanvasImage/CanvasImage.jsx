import { useEffect, useRef } from "react";
import s from "./CanvasImage.module.scss";

const CanvasImage = ({ canvasRef, gamePaused }) => {

    const imageRef = useRef();

    useEffect(() => {
        imageRef.current.src = canvasRef.current.toDataURL("image/png");;
    }, [gamePaused]);

    return (
        <>
            <img src={""} ref={imageRef} alt="" className={s.canvasImage} />
            <a href={imageRef.current?.src} download="snake.png" className={s.download}>Télécharger l'image</a>
        </>

    );
};

export default CanvasImage;