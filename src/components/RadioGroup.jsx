import styled from "styled-components";
import PropTypes from "prop-types";

import RadioButton from "./RadioButton";

const RadioGroup = ({
  legend = "",
  options,
  selectedValue,
  onChange,
  direction = "column",
  name,
  required = false,
  id,
}) => {
  const groupId =
    id || `radio-group-${legend?.replace(/\s+/g, "-").toLowerCase()}`;
  const legendId = `${groupId}-legend`;
  return (
    <fieldset aria-required={required} id={groupId}>
      {legend && <Legend id={legendId}>{legend}</Legend>}
      <Wrapper
        direction={direction}
        role="group"
        aria-labelledby={legend ? legendId : undefined}
        data-testid="radio-group-wrapper"
      >
        <RenderRadioOptions
          options={options}
          onChange={onChange}
          selectedValue={selectedValue}
          groupName={name}
          required={required}
        />
      </Wrapper>
    </fieldset>
  );
};

const RenderRadioOptions = ({
  options = [{ label: "label", name: "name" }],
  onChange,
  selectedValue,
  groupName,
  required,
}) => {
  return options.map(({ label, name }) => {
    const optionId = `radio-option-${label.replace(/\s+/g, "")}`;
    const radioName = groupName || name;

    return (
      <RadioButton
        key={optionId}
        id={optionId}
        value={label}
        label={label}
        name={radioName}
        checked={selectedValue === label}
        onChange={onChange}
        required={required}
      />
    );
  });
};

const Legend = styled.legend`
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-color);
`;

const Wrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-shrink: 0;
  white-space: nowrap;
  flex-direction: ${(props) =>
    props.direction === "column" ? "column" : "row"};
  gap: 1rem;
`;

RadioGroup.propTypes = {
  legend: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  selectedValue: PropTypes.string,
  direction: PropTypes.oneOf(["row", "column"]),
  name: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
};

export default RadioGroup;
