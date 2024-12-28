import s from "./ColorPicker.module.scss";

const ColorPicker= ({color, setColor}) => {

    const onChange = (e) => { 
        setColor(e.target.value);
        console.log(e.target.value);
    }

    return (
        <input type="color" onChange={onChange} defaultValue={color}/>
    );
};

export default ColorPicker;