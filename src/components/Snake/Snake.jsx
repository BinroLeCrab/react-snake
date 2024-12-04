import s from './Snake.module.scss';
import useStore from "../../utils/store"; 

const Snake = ({ data }) => {
    const { skin } = useStore();

    const getStyle = (dot, i) => {
        return {
            transform: `translate(${dot[0]}px, ${dot[1]}px)`,
            background: skin ? `url('${skin}') ${10 * i}px 0` : `url(./asset/Skin_snake.jpg) ${-10 * i}px 0`,
        }
    };

    return (
        <>
            {
                data.map((dot, i) => (
                    <div
                        key={i}
                        className={s.snakeDot}
                        style={getStyle(dot, i)}
                    ></div>
                ))
            }
        </>
    )
}

export default Snake;