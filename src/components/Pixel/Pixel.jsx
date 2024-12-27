import s from "./Pixel.module.scss";

const Pixel= ({x, y, color}) => {

    const style = {
        transform : `translate(${x}px, ${y}px)`,
        background: color
    };

    return (
        <div className={s.pixel} style={style}></div>
    );
};

export default Pixel;