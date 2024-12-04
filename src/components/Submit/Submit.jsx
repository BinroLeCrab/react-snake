import { useState } from 'react';
import s from './Submit.module.scss';

const Submit = ({ score, death }) => {

    const [name, setName] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(name, score, death);

        let results = localStorage.getItem("results");
        results = JSON.parse(results);
        
        const newResults = {
            name: name,
            score: score,
            death: death
        };

        if (results === null) {
            results = [];
            results.push(newResults);
        } 

        localStorage.setItem("results", JSON.stringify(results));
    };

    return (
        <form className={s.form} onSubmit={onSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
            />
        </form>
    )
}

export default Submit;