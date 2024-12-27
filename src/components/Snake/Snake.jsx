import s from './Snake.module.scss';
import useStore from "../../utils/store";

const Snake = ({ data, direction }) => {

    console.log(direction.current);

    const dataReversed = [...data].reverse();

    const { skin } = useStore();

    const getStyle = (dot, i) => {

        if (i === 0) {
            return {
                transform: `translate(${dot[0]}px, ${dot[1]}px)`,
                background: skin ? `url('${skin}') ${12 * i}px 0` : `url(./asset/Skin.png) -${direction.current === "RIGHT" ? 0 : direction.current === "DOWN" ? 12 : direction.current === "LEFT" ? 24 : 36}px 0`,
                // backgroundSize: "auto 100%",
            }
        } else {
            return {
                transform: `translate(${dot[0]}px, ${dot[1]}px)`,
                background: skin ? `url('${skin}') ${12 * i}px 0` : `url(./asset/Skin.png) ${-12 * (0 - i)}px 12px`,
                // backgroundSize: "auto 100%",
            }
        }
    };

    return (
        <>
            {
                dataReversed.map((dot, i) => (
                    <div
                        key={i}
                        className={s.snakeDot}
                        style={getStyle(dot, (0 - i))}
                    ></div>
                ))
            }
        </>
    )
}

export default Snake;