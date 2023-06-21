import React from 'react';

const ColorChoice = ({setColorCallback}) => {
    const onColorClick = (event) => {
        setColorCallback(event.target.value);
    }

    return (
        <div>
            <button value='red' onClick={onColorClick}>🔴</button>
            <button value='orange' onClick={onColorClick}>🟠</button>
            <button value='yellow' onClick={onColorClick}>🟡</button>
            <button value='green' onClick={onColorClick}>🟢</button>
            <button value='blue' onClick={onColorClick}>🔵</button>
            <button value='purple' onClick={onColorClick}>🟣</button>
        </div>
    );
};

export default ColorChoice;
