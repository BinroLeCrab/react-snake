import s from './Snake.module.scss';
import useStore from "../../utils/store"; 

const Snake = ({ data }) => {

    const dataReversed = [...data].reverse();

    const { skin } = useStore();

    const getStyle = (dot, i) => {
        return {
            transform: `translate(${dot[0]}px, ${dot[1]}px)`,
            background: skin ? `url('${skin}') ${12 * i}px 0` : `url(./asset/Skin_snake.jpg) ${-12 * i}px 0`,
            backgroundSize: "auto 100%",
        }
    };

    return (
        <>
            {
                dataReversed.map((dot, i) => (
                    console.log(dot),
                    <div
                        key={i}
                        className={s.snakeDot}
                        style={getStyle(dot, (0-i))}
                    ></div>
                ))
            }
        </>
    )
}

export default Snake;