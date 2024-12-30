import s from './Snake.module.scss';
import useStore from "../../utils/store";

const Snake = ({ data, direction }) => {
    
    const dataReversed = [...data].reverse();

    const { skin } = useStore();

    const getStyle = (dot, i) => {

        if (skin) {
            return {
                transform: `translate(${dot[0]}px, ${dot[1]}px)`,
                background: `url('${skin}') ${12 * i}px 0`,
                backgroundSize: "cover",
            }
        }else if (i === 0) {
            return {
                transform: `translate(${dot[0]}px, ${dot[1]}px)`,
                background: `url(./asset/Skin.png) -${direction.current === "RIGHT" ? 0 : direction.current === "DOWN" ? 12 : direction.current === "LEFT" ? 24 : 36}px 0`,
            }
        } else {
            return {
                transform: `translate(${dot[0]}px, ${dot[1]}px)`,
                background: `url(./asset/Skin.png) ${-12 * (0 - i)}px 12px`,
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