import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import AKlogo from "../images/AKlogo.svg";
import Flag_1 from "../images/+1Flag.png";
import Flag_44 from "../images/+44Flag.jpg";
import Flag_55 from "../images/+55Flag.jpg";
import Flag_81 from "../images/+81Flag.png";
import Flag_91 from "../images/+91Flag.png";
import parsePhoneNumber from "libphonenumber-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomDropDown from "../components/CustomDropDown";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  margin: 100px 0px;
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
  font-weight: 300;
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
  font-size: 12px;
  margin: 2px 0px;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  align-items: center;
  border: 1px solid #ffd37d;
  width: 350px;
  height: 40px;
  margin: 100px 0px 40px 0px;
  border-radius: 4px;
`;

const InputDesc = styled(Description2)`
  position: relative;
  top: 111px;
  left: -100px;
  height: 17px;
  background: white;
  padding: 0px 5px;
`;

const CountryContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CountryLogo = styled.img`
  margin: 0px 0px 0px 10px;
  width: 25px;
`;

const CountryDropDown = styled.div`
  font-size: 24px;
`;

const PhoneNumberInput = styled.input`
  border: none;
  height: 60%;
  width: 96%;
  font-size: 24px;
`;
const ButtonContainer = styled.div`
  margin: 100px 0px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const SignInButton = styled.button`
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

function SignIn({ phoneNumber, setPhoneNumber, countryCode, setCountryCode }) {
  const [showModal, setShowModal] = useState("");
  const [flag, setFlag] = useState(Flag_91);
  const navigate = useNavigate();
  const options = [
    {
      code: "+91",
      src: Flag_91,
    },
    {
      code: "+1",
      src: Flag_1,
    },
    {
      code: "+44",
      src: Flag_44,
    },
    {
      code: "+55",
      src: Flag_55,
    },
    {
      code: "+81",
      src: Flag_81,
    },
  ];

  const handlePhoneNumberChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    if (sanitizedValue.length <= 10) {
      setPhoneNumber(sanitizedValue);
    }
  };

  const handleSignInButton = async () => {
    const parsedPhoneNumber = parsePhoneNumber(countryCode + phoneNumber);
    const newUser = { phone: countryCode + phoneNumber };

    if (parsedPhoneNumber && parsedPhoneNumber.isValid()) {
      try {
        const result = await axios.post(
          `http://localhost:5050/users/`,
          newUser
        );
        if (result) {
          navigate("/otp");
        } else {
          setShowModal("OTP can not be sent.");
        }
      } catch (err) {
        setShowModal(`Error: ${err}`);
      }
    } else {
      setShowModal("Phone Number is not valid");
    }
  };

  useEffect(() => {
    const selectedFlag = options.find((option) => option.code === countryCode);
    setFlag(selectedFlag.src);
  }, [countryCode]);

  return (
    <Container>
      <LogoContainer>
        <Logo src={AKlogo} alt="..." />
      </LogoContainer>
      <DescContainer>
        <Title>Welcome Back</Title>

        <Description>Please sign in to your account</Description>
      </DescContainer>
      <InputDesc>Enter Contact Number</InputDesc>

      <InputContainer>
        <CountryContainer>
          <CountryLogo src={flag} />
          <CountryDropDown>
            <CustomDropDown
              options={options}
              selectedOption={countryCode}
              setSelectedOption={setCountryCode}
            />
          </CountryDropDown>
        </CountryContainer>
        <PhoneNumberInput
          type="tel"
          name="phone"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </InputContainer>
      <DescContainer>
        <Description2>We will send you a one time SMS message.</Description2>
        <Description2>Charges may apply.</Description2>
      </DescContainer>
      <ButtonContainer>
        <SignInButton onClick={handleSignInButton}>
          Sign In with OTP
        </SignInButton>
      </ButtonContainer>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            {showModal}
            <SignInButton onClick={() => setShowModal("")}>Close</SignInButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default SignIn;
