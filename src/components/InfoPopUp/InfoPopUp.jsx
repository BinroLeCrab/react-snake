import { Browser, GithubLogo, Info, LinkedinLogo, XCircle } from "@phosphor-icons/react";
import s from "./InfoPopUp.module.scss";
import { useState } from "react";

const InfoPopUp = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <button className={s["InfoPopUp--Btn"]} onClick={() => setOpen(!open)}>
                {open ? <XCircle size={36} />
                    : <Info size={36} />}
            </button>

            {open && (
                <>
                    <div className={s["InfoPopUp--Overlay"]} onClick={() => setOpen(false)}></div>
                    <div className={s["InfoPopUp"]}>
                        <div className={s["InfoPopUp__content"]}>
                            <h1>🐍 Snake...</h1>
                            <p>Mini-jeu en React.js réalisé dans un cadre étudiant, basé sur le jeu Snake. Il propose deux modes : un mode classique avec score, pièges et personnalisation du serpent, et un mode chill sans game over, axé sur le coloriage du plateau de jeu.</p>
                            <p>Le jeu inclut une ambiance sonore, la possibilité d’exporter ses créations et une interface simple en cours d’amélioration.</p>
                            <ul>
                                <li>📅Janvier 2025</li>
                                <li>🧑‍🚀<a href="https://robinvigier.fr" target="__blank">Robin Vigier</a></li>
                                <li>🎓Projet étudiant</li>
                                <li>⚛️React, 🦸GSAP, 🖌️Sass</li>
                            </ul>
                        </div>
                        <div className={s["InfoPopUp__social"]}>
                            <img className={s["InfoPopUp__social__picture"]} src="https://avatars.githubusercontent.com/u/144124953?v=4" alt="" />
                            <div className={s["InfoPopUp__social__name"]}>
                                <h2>Robin Vigier</h2>
                                <a href="https://github.com/BinroLeCrab" className="italic" target="__blank">@BinroLeCrab</a>
                                <p>🧑‍🚀Développeur Front-End</p>
                            </div>
                            <div className={s["InfoPopUp__social__links"]}>
                                <a className={`${s["InfoPopUp__social__links__Item"]} ${s["prtf"]}`} href="https://robinvigier.fr" target="__blank" title="Mon Portfolio">
                                    <Browser weight="bold" size={28} />
                                </a>
                                <a className={`${s["InfoPopUp__social__links__Item"]} ${s["lkdin"]}`} href="https://www.linkedin.com/in/robin-vigier-02353b267/" target="__blank" title="Mon Linkedin">
                                    <LinkedinLogo weight="bold" size={28} />
                                </a>
                                <a className={`${s["InfoPopUp__social__links__Item"]} ${s["git"]}`} href="https://github.com/BinroLeCrab" target="__blank" title="Mon Github">
                                    <GithubLogo weight="bold" size={28} />
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default InfoPopUp;

/* 
     _____     _____
    |  _  |   |  _  |
   -| | | |---| | | |-
    |_____| 7 |_____|  ~B!nro~
    
*/