import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Reset } from "styled-reset";
import { pickRandomFromArray, getRandomNumber } from "./helpers";
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
  TryAgain,
  WinningImage,
  ResultTitle,
  ResultContent,
  Points,
  Icon,
} from "./App.css";

const App = () => {
  const [choices, setChoices] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [countrys, setCountrys] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [question, setQuestion] = useState();
  const [clickedItem, setClickedItem] = useState();
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);

  const generateQuestion = useCallback(() => {
    let randomCountrys = pickRandomFromArray(countrys, 4);
    setQuestion(getRandomNumber(3));
    setClickedItem()
    setShowAnswer(false);
    setChoices(randomCountrys);
    setAnswerIndex(getRandomNumber(randomCountrys.length));
  }, [countrys]);

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then((response) => response.json())
      .then((data) => {
        let countrys = [];
        countrys = data
          .map((country) => {
            if (!country.capital) {
              return false;
            }
            return {
              name: country.name,
              capital: country.capital,
              countryCode: country.alpha2Code,
            };
          })
          .filter((country) => country);
        setCountrys(countrys);
      });
  }, []);

  useEffect(() => {
    if (countrys.length) {
      generateQuestion();
    }
  }, [countrys, generateQuestion]);

  const handleChoiceClick = (index) => () => {
    if (clickedItem >= 0) return;
    if (index === answerIndex) setResult((prev) => prev + 1);
    setClickedItem(index);
    setShowAnswer(true);
  };

  const handleNextClick = () => {
    if (clickedItem !== answerIndex) {
      setShowResult(true);
      return;
    }
    generateQuestion();
  };

  const handleTryAgainClick = () => {
    setResult(0);
    setShowResult(false);
    generateQuestion()
  };

  const renderQuestion = useMemo(() => {
    let element = null;
    if (choices.length) {
      switch (question) {
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
  }, [choices, question, answerIndex]);

  return (
    <>
      <Reset />
      <Container>
        <QuizWrapper>
          <Title>Country Quiz</Title>
          <Quiz showResult={showResult}>
            {!showResult ? (
              <>
                <Logo src="images/undraw_adventure.svg" />
                {renderQuestion}
                {choices.length
                  ? choices.map(({ name, capital }, index) => (
                      <Choices
                        onClick={handleChoiceClick(index)}
                        key={index}
                        correct={clickedItem >= 0 && index === answerIndex}
                        wrong={clickedItem === index && index !== answerIndex}
                      >
                        {question === 2 ? name : capital}
                        <Icon
                          className="material-icons"
                          isVisible={
                            clickedItem === index ||
                            (clickedItem >= 0 && index === answerIndex)
                          }
                        >
                          {index === answerIndex
                            ? `check_circle_outline`
                            : `cancel`}
                        </Icon>
                      </Choices>
                    ))
                  : null}
                <NextWrapper>
                  <Next isVisible={showAnswer} onClick={handleNextClick}>
                    <span>Next</span>
                  </Next>
                </NextWrapper>
              </>
            ) : (
              <>
                <WinningImage src="images/undraw_winners.svg" />
                <ResultTitle>Result</ResultTitle>
                <ResultContent>
                  {`You got `}
                  <Points>{result}</Points>
                  {` correct answers`}
                </ResultContent>
                <TryAgain onClick={handleTryAgainClick}>Try Again</TryAgain>
              </>
            )}
          </Quiz>
        </QuizWrapper>
        <Footer>Branislav Totic @ DevChallenges.io</Footer>
      </Container>
    </>
  );
};

export default App;
