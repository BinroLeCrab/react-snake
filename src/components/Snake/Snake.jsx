import s from './Snake.module.scss';

const Snake = ({ data }) => {
    // console.log(data);

    const getStyle = (dot, i) => {
        return {
            transform: `translate(${dot[0]}px, ${dot[1]}px)`,
            background: `url(./asset/Skin_waldi.jpg) ${-10 * i}px 0`,
            backgroundSize: 'auto 100%',
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