import { useEffect, useRef } from "react";
import s from "./CanvasImage.module.scss";

const CanvasImage = ({ canvasRef, gamePaused }) => {

    const imageRef = useRef();
    const lienRef = useRef();

    useEffect(() => {
        imageRef.current.src = canvasRef.current.toDataURL("image/png");
        lienRef.current.href = imageRef.current.src;
    }, [gamePaused]);

    return (
        <>
            <img src={""} ref={imageRef} alt="" className={s["canvasImage"]} />
            <a href={""} ref={lienRef} download="snake.png" className={s["downloadLink"]}>Télécharger l'image</a>
        </>

    );
};

export default CanvasImage;