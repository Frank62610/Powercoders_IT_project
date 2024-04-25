import { useState, useEffect } from "react";

export function EachQuestion(props){

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answersList, setAnswersList] = useState([props.correct_answer,
        ...props.incorrect_answers])

  

    useEffect(() => {
        // Shuffle the answersList array (Fisher-Yates shuffle)
        const shuffledList = [...answersList];
        for (let i = shuffledList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
        }
        setAnswersList(shuffledList);
    }, [props.rounds]); // Empty dependency array ensures this effect runs only once

    


    function handleToggleAnswer(answer) {
        setSelectedAnswer(answer);
        // You can also pass the question ID if needed: props.handleToggleAnswer(props.id, answer)
    };


    

    const genAnswers = answersList.map(element => {
        const isChecked = element === selectedAnswer
        let styles = {
            backgroundColor: isChecked ? (props.finish ? "red" : "#808080") : "white"    
        }

        if (props.finish && element === props.correct_answer){
            styles = {
                backgroundColor: "green"
            }
        }
        return (
        <div className="questionForm">
            <input type="radio" id={element} 
                name="choice" value={element} 
                checked={isChecked}
                onChange={() => {
                    props.handleToggleAnswer(props.id, element);
                    handleToggleAnswer(element)}}
                
                />
            <label htmlFor={element} className={element} style={styles}>
                {element
                    .replace(/&#039;/g, "'")
                    .replace(/&quot;/g, '"')}
            </label>
            <br />
        </div> 
    )})

    // Shuffle the answersList array (Fisher-Yates shuffle)


    let question = props.question
                    .replace(/&#039;/g, "'")
                    .replace(/&quot;/g, '"')


    return (
        <div id={props.id} className="eachQuestion"> 
            <h2>{question}</h2>
            {genAnswers}
            
        </div>
    );
}