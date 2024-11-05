import uniqid from 'uniqid';

export const generateRandomCoordinates = (mode) => {
    // console.log("generateRandomCoordinates");
    // console.log(mode);

    const id = uniqid();

    let min = 0;
    let max = 49;

    let x, y;

    if (mode.includes("corner")) {

        const side = Math.random();

        if (side <= 0.25) {
            // générer à gauche
            x = max * 10;
            y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
            y *= 10;
        } else if (side > 0.25 && side <= 0.5) {
            // générer en droite
            x = min;
            y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
            y *= 10;
        } else if (side > 0.5 && side <= 0.75) {
            // générer en bas
            y = max * 10;
            x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
            x *= 10;
        } else if (side > 0.75) {
            // générer en haut
            y = min;
            x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
            x *= 10;
        }

    } else {
        x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
        x *= 10;
        y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
        y *= 10;
    }


    return { x, y, id };
}

export const defaultControls = (e, direction, gamePaused, setGamePaused) => {
    switch (e.keyCode) {
        case 32: // Space
            setGamePaused(gamePaused ? false : true);
            break;
        case 38: // Up
        case 90: // Z
            if (direction.current !== "DOWN" && gamePaused === false) {
                direction.current = "UP";
            }
            break;
        case 40: // Down
        case 83: // S
            if (direction.current !== "UP" && gamePaused === false) {
                direction.current = "DOWN";
            }
            break;
        case 37: // Left
        case 81: // Q
            if (direction.current !== "RIGHT" && gamePaused === false) {
                direction.current = "LEFT";
            }
            break;
        case 39: // Rigth
        case 68: // D
            if (direction.current !== "LEFT" && gamePaused === false) {
                direction.current = "RIGHT";
            }
            break;

        default:
            break;
    }
};

export const reversedControls = (e, direction, gamePaused, setGamePaused) => {
    switch (e.keyCode) {
        case 32: // Space
            setGamePaused(gamePaused ? false : true);
            break;
        case 38: // Up
        case 90: // Z
            if (direction.current !== "UP" && gamePaused === false) {
                direction.current = "DOWN";
            }
            break;
        case 40: // Down
        case 83: // S
            if (direction.current !== "DOWN" && gamePaused === false) {
                direction.current = "UP";
            }
            break;
        case 37: // Left
        case 81: // Q
            if (direction.current !== "LEFT" && gamePaused === false) {
                direction.current = "RIGHT";
            }
            break;
        case 39: // Rigth
        case 68: // D
            if (direction.current !== "RIGHT" && gamePaused === false) {
                direction.current = "LEFT";
            }
            break;

        default:
            break;
    }
};