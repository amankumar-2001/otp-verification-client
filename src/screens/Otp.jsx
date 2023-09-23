import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import AKlogo from "../images/otpScreenLogo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  width: 200px;
`;

const DescContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Resend = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
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

const ChangePhoneButton = styled.button`
  font-size: 12px;
  margin: 2px 0px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 200;
  line-height: 19px;
  letter-spacing: 0em;
  color: #f7b348;
  cursor: pointer;
  text-decoration: underline;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  width: 350px;
  height: 35px;
  margin: 100px 0px 40px 0px;
  border-radius: 4px;
  gap: 38px;
`;

const OtpInput = styled.input`
  width: 50px;
  height: 50px;
  font-size: 40px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin: 100px 0px;
`;

const OtpButton = styled.button`
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

function Otp({ phoneNumber, countryCode }) {
  const [otp1, setOtp1] = useState();
  const [otp2, setOtp2] = useState();
  const [otp3, setOtp3] = useState();
  const [otp4, setOtp4] = useState();

  const [showModal, setShowModal] = useState("");
  const navigate = useNavigate();
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (e.key === "ArrowRight" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
    if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const getOTP = async () => {
    const user = { phone: countryCode + phoneNumber };
    if (!phoneNumber || !countryCode) {
      navigate("/");
    }

    try {
      const result = await axios.post(`http://localhost:5050/users/otp`, user);
      if (result.data && result.data.otp) {
        setShowModal(`Your OTP: ${result.data.otp}`);
      } else {
        setShowModal("OTP could not be sent. Try again!!");
      }
    } catch (err) {
      setShowModal(`Error: ${err}`);
    }
  };

  const resendOTP = async () => {
    const user = { phone: countryCode + phoneNumber };
    if (!phoneNumber || !countryCode) {
      navigate("/");
    }

    try {
      const result = await axios.put(
        `http://localhost:5050/users/resendOTP`,
        user
      );
      if (result) {
        setShowModal(`Your OTP: ${result.data.otp}`);
      } else {
        setShowModal("OTP could not be sent. Try again!!");
      }
    } catch (err) {
      setShowModal(`Error: ${err}`);
    }
  };

  const deleteOTP = async () => {
    const user = { phone: countryCode + phoneNumber };
    if (!phoneNumber || !countryCode) {
      navigate("/");
    }
    try {
      await axios.post(`http://localhost:5050/users/deleteOTP`, user);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const verifyOTP = async () => {
    const otp = otp1 + otp2 + otp3 + otp4;
    const user = { phone: countryCode + phoneNumber };
    try {
      const result = await axios.post(`http://localhost:5050/users/otp`, user);
      if (result && result.data.otp === otp) {
        deleteOTP();
        navigate("/success");
      } else {
        setShowModal("Wrong OTP!!");
      }
    } catch (err) {
      setShowModal(`Error: ${err}`);
    }
  };

  useEffect(() => {
    if (!phoneNumber || !countryCode) {
      navigate("/");
    }
  }, [phoneNumber, countryCode]);

  useEffect(() => {
    getOTP();
  }, []);

  return (
    <Container>
      <LogoContainer>
        <Logo src={AKlogo} alt="..." />
      </LogoContainer>
      <DescContainer>
        <Title>Please verify Mobile number</Title>

        <Description>An OTP is sent to {countryCode + phoneNumber}</Description>
        <ChangePhoneButton
          onClick={() => {
            navigate("/");
          }}
        >
          Change Phone Number
        </ChangePhoneButton>
      </DescContainer>

      <InputContainer>
        <OtpInput
          type="text"
          value={otp1}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            if (numericValue.length <= 1) {
              setOtp1(numericValue);
            }
          }}
        />
        <OtpInput
          type="text"
          value={otp2}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            if (numericValue.length <= 1) {
              setOtp2(numericValue);
            }
          }}
        />
        <OtpInput
          type="text"
          value={otp3}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            if (numericValue.length <= 1) {
              setOtp3(numericValue);
            }
          }}
        />
        <OtpInput
          type="text"
          value={otp4}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            if (numericValue.length <= 1) {
              setOtp4(numericValue);
            }
          }}
        />
      </InputContainer>
      <Resend>
        <Description>Didn’t receive the code?</Description>
        <ChangePhoneButton onClick={resendOTP}>Resend</ChangePhoneButton>
      </Resend>
      <ButtonContainer>
        <OtpButton onClick={verifyOTP}>Verify</OtpButton>
      </ButtonContainer>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            {showModal}
            <OtpButton onClick={() => setShowModal("")}>Close</OtpButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default Otp;
