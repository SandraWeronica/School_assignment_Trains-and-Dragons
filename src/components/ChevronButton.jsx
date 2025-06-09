import styled from "styled-components";
import PropTypes from "prop-types";
import { IoChevronForwardSharp } from "react-icons/io5";
import { IoChevronBackSharp } from "react-icons/io5";

const ChevronButton = ({ direction, onClick, disabled }) => {
  const buttonText = direction === "back" ? "Föregående" : "Nästa";

  return (
    <StyledChevronButton
      onClick={onClick}
      disabled={disabled}
      aria-label={buttonText}
      title={buttonText}
    >
      {direction === "back" ? (
        <IoChevronBackSharp size="36px" aria-hidden="true" />
      ) : (
        <IoChevronForwardSharp size="36px" aria-hidden="true" />
      )}
    </StyledChevronButton>
  );
};

const StyledChevronButton = styled.button`
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  height: 50px;
  width: 50px;

  & svg {
    color: var(--input);
  }

  &:hover svg {
    color: var(--el-hover);
  }
  
  &:focus-visible {
    outline: 2px solid var(--el-focus, #0066ff);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:disabled svg {
    display: none;
  }
  
  @media (max-width: 1000px) {
    display: none;
  }
`;

ChevronButton.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ChevronButton;
