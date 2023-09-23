import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const DropdownList = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CountryLogo = styled.img`
  width: 40px;
`;

function CustomDropDown({ options, selectedOption, setSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>{selectedOption}</DropdownButton>
      <DropdownList isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownItem
            key={index}
            onClick={() => handleOptionClick(option.code)}
          >
            <CountryLogo src={option.src} />
            {option.code}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
}

export default CustomDropDown;
