import styled, { css } from "styled-components";

export const Container = styled.div`
  align-items: center;
  background-image: url("images/background.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  font-family: Poppins;
  font-style: normal;
  height: 100vh;
  justify-content: center;
  position: relative;
`;

export const Title = styled.h1`
  color: #f2f2f2;
  font-size: 2.25rem;
  font-weight: bold;
  line-height: 3.375rem;
  margin-bottom: 0.625rem;
  text-transform: uppercase;
`;

export const QuizWrapper = styled.div``;

export const Quiz = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 1.5rem;
  padding: 4rem 2rem 2rem;
  width: 464px;
`;

export const Footer = styled.span`
  bottom: 1.1875rem;
  color: #f2f2f2;
  font-family: Montserrat;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.0625rem;
  position: absolute;
`;

export const Question = styled.div`
  color: #2f527b;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 2.25rem;
  margin-bottom: 2rem;
`;

export const Choices = styled.div`
  border: 2px solid rgba(96, 102, 208, 0.7);
  box-sizing: border-box;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  padding: 0.9375rem 1.25rem;
  color: rgba(96, 102, 208, 0.8);
  transition: background-color ease-in-out 0.3s;

  &:hover {
    background-color: #f9a826;
    color: #fff;
  }
`;

export const NextWrapper = styled.div`
  text-align: right;
`;

export const Next = styled.div`
  cursor: pointer;
  display: inline-block;
  flex-direction: row-reverse;
  opacity: 0;
  transition: ease-in 0.1s;
  padding: 0.9375rem 1.25rem;
  background-color: #f9a826;
  box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
  border-radius: 0.75rem;

  span {
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.6875rem;
    color: #ffffff;
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
    `}
`;

export const FLagIcon = styled.img``;

export const Logo = styled.img`
  position: absolute;
  top: -85px;
  right: 0;
`;
