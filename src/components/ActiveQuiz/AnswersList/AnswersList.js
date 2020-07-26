import React from "react";
import AnswerItem from "./AnswerItem/AnswerItem";
import "./AnswersList.css"

const AnswersList = props => (
    <ul className="AnswersList">
        { props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    answer={answer}
                    key={index}
                    onAnswerClick={props.onAnswerClick}
                    state={ props.state ? props.state[answer.id] : null }
                />
            )
        }) }
    </ul>
);

export default AnswersList
