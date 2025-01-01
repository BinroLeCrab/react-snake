import s from "./ScreenMobile.module.scss";

const ScreenMobile= () => {

    return (
        <div className={s["screenMobile"]}>
            <img src="/asset/icon/desktop.svg" alt="" className={s["screenMobile--icon"]} />
            <p>Cette expérience est optimisée pour les ordinateurs en raison de ses contrôles au clavier.</p>
            <p>Merci de la consulter sur un appareil approprié.</p>
        </div>
    );
};

export default ScreenMobile;