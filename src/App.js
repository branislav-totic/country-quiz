import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Reset } from "styled-reset";
import { shuffleArray, pickRandomFromArray, getRandomNumber } from "./helpers";
import {
  Choices,
  Container,
  FLagIcon,
  Footer,
  Logo,  
  Next,
  NextWrapper,
  Question,
  Quiz,
  QuizWrapper,
  Title,
} from "./App.css";

const App = () => {
  const [choices, setChoices] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [countrys, setCountrys] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [isCapitalQuestion, setIsCapitalQuestion] = useState();
  const [clickedItem, setClickedItem] = useState();

  const generateQuestion = useCallback(() => {
    let randomCountrys = shuffleArray(pickRandomFromArray(countrys, 4));
    setChoices(randomCountrys);
    setAnswerIndex(getRandomNumber(randomCountrys.length));
  }, [countrys]);

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then((response) => response.json())
      .then((data) => {
        let countrys = [];
        countrys = data.map((country) => {
          if (!country.capital) return false;
          return {
            name: country.name,
            capital: country.capital,
            countryCode: country.alpha2Code,
          };
        });
        setCountrys(countrys);
      });
  }, []);

  useEffect(() => {
    if (countrys.length) {
      generateQuestion();
    }
  }, [countrys, generateQuestion]);

  const handleChoiceClick = (index) => ()=> {
    setClickedItem(index);
    setShowAnswer(true);
  };

  const renderQuestion = useMemo(() => {
    const randomizeQuestion = getRandomNumber(3);
    setIsCapitalQuestion(randomizeQuestion === 2 ? true : false);
    let element = null;

    if (choices.length) {
      switch (randomizeQuestion) {
        case 0:
          element = (
            <Question>{`${choices[answerIndex].capital} is capital of`}</Question>
          );
          break;
        case 1:
          element = (
            <Question>{`${choices[answerIndex].name} capital city is`}</Question>
          );
          break;
        case 2:
          element = (
            <>
              <FLagIcon
                src={`https://www.countryflags.io/${choices[
                  answerIndex
                ].countryCode.toLowerCase()}/shiny/64.png`}
                alt={choices[answerIndex].name}
              />
              <Question>Which country this flag belog to?</Question>
            </>
          );
          break;
        default:
          break;
      }
    }

    return element;
  }, [answerIndex, choices]);

  return (
    <>
      <Reset />
      <Container>
        <QuizWrapper>
          <Title>Country Quiz</Title>
          <Quiz buttonVisible={showAnswer}>
            <Logo src="images/undraw_adventure.svg"/>
            {renderQuestion}
            {choices.length
              ? choices.map(({ name, capital }, index) => (
                  <Choices onClick={handleChoiceClick(index)} key={index}>
                    {console.log(isCapitalQuestion)}
                    {isCapitalQuestion ? name : capital}
                  </Choices>
                ))
              : null}
            <NextWrapper>
              <Next isVisible={showAnswer}>
                <span>Next</span>
              </Next>
            </NextWrapper>
          </Quiz>
        </QuizWrapper>
        <Footer>Branislav Totic @ DevChallenges.io</Footer>
      </Container>
    </>
  );
};

export default App;
