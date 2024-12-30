import useStore from "../../utils/store";
import s from "./Dropzone.module.scss";

const Dropzone = ({getRootProps, getInputProps}) => {
    
    const { skin } = useStore();

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop un fichier ici, ou clique pour en séléctionner un</p>
            {skin && <img src={skin} style={{ width: "30px" }} alt="" />}
        </div>
    );
};

export default Dropzone;