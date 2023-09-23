import React from "react";
import { styled } from "styled-components";
import SuccessLogo from "../images/artboard1.svg";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  margin: 10px 0px;
`;

const Logo = styled.img`
  width: 400px;
`;

const DescContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: system-ui;
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  margin: 5px 0px;
  display: flex;
  justify-content: center;
`;

const Description = styled(Title)`
  font-size: 16px;
  font-weight: 200;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
`;

const Description2 = styled(Description)`
  font-weight: 300;
`;

const Description3 = styled(Description)`
  font-weight: 100;
  font-size: 13px;
`;
const ButtonContainer = styled.div`
  margin: 100px 0px 10px 0px;
`;

const SuccessButton = styled.button`
  width: 224px;
  height: 36px;
  top: 658px;
  left: 75px;
  border-radius: 100px;
  background: #f7b348;
  border: none;
  cursor: pointer;
  color: white;
`;

function Success() {
  return (
    <Container>
      <LogoContainer>
        <Logo src={SuccessLogo} alt="..." />
      </LogoContainer>
      <DescContainer>
        <Title>Welcome to AdmitKard</Title>
        <Description>In order to provide you with</Description>
        <Description>a custom experience,</Description>
        <Description2>we need to ask you a few questions.</Description2>
      </DescContainer>
      <ButtonContainer>
        <SuccessButton>Get Started</SuccessButton>
      </ButtonContainer>
      <DescContainer>
        <Description3>*This will only take 5 min.</Description3>
      </DescContainer>
    </Container>
  );
}

export default Success;
