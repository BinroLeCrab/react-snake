import { useEffect, useState } from 'react';
import s from './Toggle.module.scss';
import useStore from '../../utils/store';

const Toggle = ({ mode }) => {
    const { mode: storeMode, addMode, removeMode } = useStore();

    // console.log(storeMode);

    const handleClick = () => {
        if(storeMode.includes(mode)) {
            removeMode(mode);
        } else {
            addMode(mode);
        }
    }

    return (
        <div className={s.wrapper} onClick={() => handleClick()}>
            <div className={s.toggle}>
                <div className={`${s.switch} ${storeMode.includes(mode) === true ? s.switch_active : ""}`}></div>
            </div>
            <span className={s.mode}>{mode}</span>
        </div>
    )
};

export default Toggle;