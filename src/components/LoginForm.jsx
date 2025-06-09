import Input from "./Input";
import { isEmail, isNotEmpty } from "../util/validation";
import { useActionState } from "react";
import useUser from "../context/user/useUser";
import SubmitButton from "./SubmitButton";
import Button from "./Button";
import PropTypes from "prop-types";

const LoginForm = ({ onSignupClick }) => {
  const { login } = useUser();

  const loginAction = async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    let errors = {};

    if (!isEmail(email)) {
      errors.emailError = "E-mail är ogiltig";
    }
    if (!isNotEmpty(password)) {
      errors.passwordError = "Lösenord är ogiltig";
    }
    if (Object.keys(errors).length > 0) {
      return {
        errors,
        enteredValues: {
          email,
          password,
        },
      };
    }

    await login(email, password);
    return { errors: null };
  };

  const [formState, formAction] = useActionState(loginAction, {
    errors: null,
  });

  const emailErrorId = formState.errors?.emailError ? "email-error" : undefined;
  const passwordErrorId = formState.errors?.passwordError ? "password-error" : undefined;

  return (
    <form action={formAction} className="w-full" noValidate>
      <div className="mb-4">
        <Input
          className="flex justify-center w-full text-(--bg-dark) ml-1 "
          type="email"
          name="email"
          placeholder="E-mail"
          label="E-mail"
          required
          defaultValue={formState.enteredValues?.email}
          aria-describedby={emailErrorId}
          aria-invalid={formState.errors?.emailError ? "true" : undefined}
        />
        {formState.errors?.emailError && (
          <p id="email-error" className="ml-8 mb-4 text-rose-300" role="alert">
            {formState.errors.emailError}
          </p>
        )}
      </div>
      <div className="mb-4">
        <Input
          className="flex justify-center w-full text-(--bg-dark) ml-1"
          type="password"
          name="password"
          placeholder="Lösenord"
          label="Lösenord"
          required
          defaultValue={formState.enteredValues?.password}
          aria-describedby={passwordErrorId}
          aria-invalid={formState.errors?.passwordError ? "true" : undefined}
        />
        {formState.errors?.passwordError && (
          <p id="password-error" className="ml-8 mb-4 text-rose-300" role="alert">
            {formState.errors.passwordError}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-50 py-2 w-full">
        <Button onClick={onSignupClick} text="Bli medlem"></Button>
        <SubmitButton submitText="Logga in" submittingText="Loggar in" />
        
      </div>
    </form>
  );
};

LoginForm.propTypes = { onSignupClick: PropTypes.func };
export default LoginForm;
