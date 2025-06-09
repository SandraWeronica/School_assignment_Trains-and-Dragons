import Button from "./Button";
import PropTypes from "prop-types";
import { useFormStatus } from "react-dom";
import { ImSpinner3 } from "react-icons/im";

const SubmitButton = ({ submitText, submittingText }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      text={pending ? submittingText : submitText}
      aria-busy={pending}
    >
      {pending && (
        <span aria-hidden="true">
          <ImSpinner3 className="animate-spin ml-2" />
        </span>
      )}
    </Button>
  );
};

SubmitButton.propTypes = {
  submitText: PropTypes.string.isRequired,
  submittingText: PropTypes.string.isRequired,
};

export default SubmitButton;



