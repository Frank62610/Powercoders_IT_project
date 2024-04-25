import React, { useEffect, useState } from 'react';
import { EachQuestion } from './EachQuestion';
import './quiz.css'

export function GenQuiz(){

    const [quizData, setQuizData] = useState([])
    const [start, setStart] = useState(false)
    const [answers, setAnswers] = useState([])
    const [finish, setFinish] = useState(false)
    const [rounds, setRounds] = useState(0)
 

    useEffect(function() {
        fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
            .then(res => res.json())
            .then(data => {
                // Check if the data is an array before setting the state
                if (Array.isArray(data.results)) {
                    setQuizData(data.results);
                    const answersList = data.results.map(data => ({ question: data.question }));
                    setAnswers(answersList);
                } else {
                    console.error("Quiz data is not in the expected format:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching quiz data:", error);
            });


    }, [rounds]);


    
    const allQuizBoxes = quizData.map( data => 
        (
            <EachQuestion 
                key={data.question}
                id={data.question}
                correct_answer={data.correct_answer}
                incorrect_answers={data.incorrect_answers}
                question={data.question}
                handleToggleAnswer={toggleAnswer}
                handleToggleFinish={toggleFinish}
                finish={finish}
                rounds={rounds}
            />
        )
    )

    function GenFinishButton(){
        return (
            <button className="startQuiz"
            onClick={toggleFinish}>
                Submit & Check result
            </button>
        )
    }

    function toggleStart(){
        setStart(!start)
    }

    function toggleAnswer(question, answer){
        answers.forEach(element => {
            if (element.question === question){
                element.answer = answer
            }  
        });
    }

    function toggleFinish(){
        setFinish(!finish)
    }

    function genScore() {
        let score = 0;
        quizData.forEach(question => {
            const userAnswer = answers.find(answer => answer.question === question.question);
            if (userAnswer && userAnswer.answer === question.correct_answer) {
                score++;
            }});
        return score;
    }

    function toggleTryAgain(){
        setRounds(rounds+1)
        setFinish(!finish)
    }


    return (
        <div className='mainDiv'>
            {!start ? <button onClick={toggleStart}
                className='startQuiz'>Start the Quiz game!</button> 
                : <>{allQuizBoxes}
                {!finish ? <GenFinishButton />: 
                    <><p>Your score: {genScore()}/{answers.length}</p>
                    <button 
                        onClick={toggleTryAgain}
                        className='startQuiz'>
                            Try again?
                    </button></>
                }</>}   
        </div>
    )
}