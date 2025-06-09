import styled from "styled-components";
import PropTypes from "prop-types";

const RadioButton = ({
  label,
  id,
  name,
  required = false,
  ...props
}) => {
  return (
    <Wrapper role="radiogroup">
      <Radio
        type="radio"
        id={id}
        name={name}
        aria-required={required}
        {...props}
      />
      <Label htmlFor={id}>
        {label}
        {required && <VisuallyHidden>(required)</VisuallyHidden>}
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-color);
  cursor: pointer;
`;

const Radio = styled.input`
  appearance: none;
  margin: 0;
  width: 20px;
  height: 20px;
  border: 2px solid var(--el-10);
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin: 2px;
  }
  &:checked::after {
    background-color: var(--el-10);
  }
  &:hover::after {
    background-color: var(--el-hover);
  }
  &:focus-visible {
    outline: 3px solid var(--el-10);
    outline-offset: 1px;
  }
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool,
};

export default RadioButton;
