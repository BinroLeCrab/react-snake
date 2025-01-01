import useStore from "../../utils/store";
import s from "./Dropzone.module.scss";

const Dropzone = ({ getRootProps, getInputProps }) => {

    const { skin } = useStore();

    return (
        <div {...getRootProps({ className: s["dropzone"] })}>
            <input {...getInputProps()} />
            <p className={s["dropzone__title"]}>Skin</p>
            <div className={s["dropzone__content"]}>
                {skin ? (
                    <div className={s["skin"]}>
                        <img src={skin} className={s["skin__pixel"]} alt="" />
                        <img src={skin} className={s["skin__pixel"]} alt="" />
                        <img src={skin} className={s["skin__pixel"]} alt="" />
                    </div>
                )
                    : (
                        <p className={s["dropzone__description"]}>Drag 'n' drop, ou cliquez.</p>
                    )
                }
            </div>
        </div>
    );
};

export default Dropzone;