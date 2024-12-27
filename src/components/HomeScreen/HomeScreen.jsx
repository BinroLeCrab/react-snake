import s from "./HomeScreen.module.scss";

const HomeScreen = ({ setPlay }) => {

    return (
        <>
            <button onClick={() => setPlay("classic")}>Classic</button>
            <button onClick={() => setPlay("chill")}>Chill</button>
        </>
    );
};

export default HomeScreen;