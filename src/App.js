import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import SignIn from "./screens/SignIn";
import Success from "./screens/Success";
import Otp from "./screens/Otp";

const AppContainer = styled.div``;

function App() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [countryCode, setCountryCode] = useState("+91");

  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <SignIn
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
              />
            }
          />
          <Route path="/success" exact element={<Success />} />
          <Route
            path="/otp"
            exact
            element={
              <Otp phoneNumber={phoneNumber} countryCode={countryCode} />
            }
          />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
