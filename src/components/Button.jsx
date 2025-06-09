import { PropTypes } from "prop-types";

const Button = ({
  children,
  text,
  onClick,
  disabled,
  extraStyles,
  type = "button",
  ariaLabel,
  ...props }) => {

  const baseStyles =
    "text-(--text-color) py-2 px-4 rounded font-serif bg-(--el-10) hover:bg-(--el-hover) focus:ring-2 focus:ring-offset-2 focus:ring-(--el-hover) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer whitespace-nowrap";

  const disabledStyles =
    "text-(--text-color) py-2 px-4 rounded bg-gray-700 hover:bg-gray-700 font-serif cursor-not-allowed opacity-50";

  return (
    <button
      className={disabled ? `${disabledStyles}` : `${baseStyles} ${extraStyles}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
      {text}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  extraStyles: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  ariaLabel: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  isLoading: false,
  type: "button",
};


export default Button;
