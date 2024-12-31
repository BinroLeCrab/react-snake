import useStore from "../../utils/store";
import s from "./Dropzone.module.scss";

const Dropzone = ({ getRootProps, getInputProps }) => {

    const { skin } = useStore();

    return (
        <div {...getRootProps({ className: s["dropzone"] })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop un fichier ici, ou clique pour en séléctionner un</p>
            {skin ? (
                <div className={s["skin"]}>
                    <img src={skin} style={{ width: "30px" }} alt="" />
                    <img src={skin} style={{ width: "30px" }} alt="" />
                    <img src={skin} style={{ width: "30px" }} alt="" />
                </div>
            )
                : (
                    <div className={s["skin"]}>
                        <img src={skin} style={{ width: "30px" }} alt="" />
                        <img src={skin} style={{ width: "30px" }} alt="" />
                        <img src={skin} style={{ width: "30px" }} alt="" />
                    </div>
                )
            }
        </div>
    );
};

export default Dropzone;