import s from "./HomeScreen.module.scss";

const HomeScreen = ({ setPlay }) => {

    return (
        <section className={s["HomeScreen"]}>
            <img src="/asset/Logo_Snake.svg" alt="Snake..." className={s["HomeScreen__logo"]} />
            <div className={s["HomeScreen__button-wrapper"]}>
                <button onClick={() => setPlay("classic")}>Classic</button>
                <button onClick={() => setPlay("chill")}>Chill</button>
            </div>
        </section>
    );
};

export default HomeScreen;