import PropTypes from "prop-types";
import styled from "styled-components";

const Select = ({ onChange, options, label, id, ...props }) => {
  const selectId = id || `select-${Math.floor(Math.random() * 10000)}`;

  return (
    <>
      {label && <Label htmlFor={selectId}>{label}</Label>}
      <StyledSelect
        onChange={onChange}
        id={selectId}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--input);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.9rem;
  background-color: var(--input);
  color: var(--text-color-dark);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.65rem auto;

  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: var(--el-hover);
  }

  &:focus {
    border-color: var(--el-10);
    outline: 2px solid var(--el-10);
    outline-offset: 1px;
  }
`;

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default Select;
