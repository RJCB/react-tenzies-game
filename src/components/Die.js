import React from "react";

const Die = (props) => {
    return (
        <div className={`die ${props.isHeld ? "held" : "not-held"}`} onClick={() => props.holdDice(props.id)}>{props.value}</div>
    )
}

export default Die;