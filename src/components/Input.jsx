import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/Input.module.css";

const Input = ({
  label,
  value,
  type = "text",
  placeholder = "",
  required = false,
  onChange = () => { },
  icon = "",
  name = "",
  size = "md",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = name || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.input_wrapper}>
      {label && (
        <label
          className={`${styles.label} ${size === "md" ? styles.md : styles.lg}`}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <div className={styles.input_container}>
        {icon && <div className={styles.input_icon} aria-hidden="true">{icon}</div>}
        <input
          type={showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          name={name}
          id={inputId}
          className={size === "md" ? styles.md : styles.lg}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className={styles.input_icon}
            onClick={handleTogglePassword}
            aria-label={showPassword ? "Visa lösenord" : "Dölj lösenord"}
            tabIndex="0"
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  icon: PropTypes.element,
  name: PropTypes.string,
  size: PropTypes.oneOf(["md", "lg"]),
};

export default Input;

{
  /* <Input label="Search" icon={<AiOutlineSearch />} placeholder="Search..." />; */
}
