import React, { useEffect, useState } from 'react';
import { EachQuestion } from './EachQuestion';
import './quiz.css'
import {jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export function GenQuiz(){

    const [quizData, setQuizData] = useState([])
    const [start, setStart] = useState(false)
    const [answers, setAnswers] = useState([])
    const [finish, setFinish] = useState(false)
    const [rounds, setRounds] = useState(0)
    const [username, setUsername] = useState('')
 

    useEffect(function() {
        try {
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
        } catch (error) {
            console.error("An error occurred during the fetch operation:", error);
        }
    }, [rounds]);

    useEffect(() => {
        // Function to get and decode the JWT token from cookies
        const decodeTokenFromCookie = () => {
            // Get the JWT token from cookies
            let token = document.cookie;
            console.log("this is the token" , token)
            if (token) {
                try {
                    // Decode the JWT token to extract the username
                    const decodedToken = jwtDecode(token);
                    console.log(decodedToken);
                    // Extract the username from the decoded token
                    const { username } = decodedToken;
                    // Update the state with the username
                    setUsername(username);
                    console.log(username)
                } catch (error) {
                    console.error('Error decoding JWT token:', error);
                }
            } else {
                console.log('JWT token not found in cookies.');
            }
        };
    
        // Call the function to decode the token when the component mounts
        decodeTokenFromCookie();
    }, []);
    
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
            <h2>{username}</h2>
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