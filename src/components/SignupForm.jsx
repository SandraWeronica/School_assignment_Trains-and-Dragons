import Input from "./Input";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  valuesAreEqual,
} from "../util/validation";
import { useActionState } from "react";
import useUser from "../context/user/useUser";
import SubmitButton from "./SubmitButton";

const SignupForm = () => {
  const { signup } = useUser();

  const signupAction = async (prevState, formData) => {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const age = formData.get("age");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    let errors = {};

    if (!isNotEmpty(firstName)) {
      errors.firstNameError = "Du måste ange ett förnamn";
    }

    if (!isNotEmpty(lastName)) {
      errors.lastNameError = "Du måste ange ett efternamn";
    }

    if (!isNotEmpty(age)) {
      errors.ageError = "Du måste ange ålder";
    }

    if (!isEmail(email)) {
      errors.emailError = "Du måste ange en giltig mail-adress";
    }

    if (!isNotEmpty(password)) {
      errors.emptyPasswordError = "Du måste ange ett lösenord";
    } else if (!hasMinLength(password, 8)) {
      errors.passwordLengthError = "Lösenordet måste innehålla minst 8 tecken";
    }
    if (!valuesAreEqual(password, confirmPassword)) {
      errors.confirmPasswordError = "Lösenorden matchar inte";
    }

    if (Object.keys(errors).length > 0) {
      return {
        errors,
        enteredValues: {
          email,
          password,
          firstName,
          lastName,
          age,
          confirmPassword,
        },
      };
    }
    await signup(firstName, lastName, age, email, password);
    return { errors: null };
  };

  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  // Generate error IDs for aria-describedby
  const firstNameErrorId = formState.errors?.firstNameError ? 'firstName-error' : undefined;
  const lastNameErrorId = formState.errors?.lastNameError ? 'lastName-error' : undefined;
  const ageErrorId = formState.errors?.ageError ? 'age-error' : undefined;
  const emailErrorId = formState.errors?.emailError ? 'email-error' : undefined;
  const passwordErrorId = formState.errors?.emptyPasswordError || formState.errors?.passwordLengthError ? 'password-error' : undefined;
  const confirmPasswordErrorId = formState.errors?.confirmPasswordError ? 'confirmPassword-error' : undefined;

  return (
    <form action={formAction} className="flex flex-col w-4/4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            className="text-(--bg-dark) ml-1"
            type="text"
            name="firstName"
            placeholder="Förnamn"
            label="Förnamn"
            required
            aria-required="true"
            aria-invalid={formState.errors?.firstNameError ? "true" : undefined}
            aria-describedby={firstNameErrorId}
            defaultValue={formState.enteredValues?.firstName}
          />
          {formState.errors?.firstNameError && (
            <p id="firstName-error" className="ml-8 mb-4 text-rose-300" role="alert">
              {formState.errors.firstNameError}
            </p>
          )}
        </div>
        <div>
          <Input
            className="text-(--bg-dark) ml-1"
            type="text"
            name="lastName"
            placeholder="Efternamn"
            label="Efternamn"
            required
            aria-required="true"
            aria-invalid={formState.errors?.lastNameError ? "true" : undefined}
            aria-describedby={lastNameErrorId}
            defaultValue={formState.enteredValues?.lastName}
          />
          {formState.errors?.lastNameError && (
            <p id="lastName-error" className="ml-8 mb-4 text-rose-300" role="alert">
              {formState.errors.lastNameError}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            className="text-(--bg-dark)"
            type="number"
            name="age"
            placeholder="Ålder"
            label="Ålder"
            min="0"
            required
            aria-required="true"
            aria-invalid={formState.errors?.ageError ? "true" : undefined}
            aria-describedby={ageErrorId}
            defaultValue={formState.enteredValues?.age}
          />
          {formState.errors?.ageError && (
            <p id="age-error" className="ml-8 mb-4 text-rose-300" role="alert">
              {formState.errors.ageError}
            </p>
          )}
        </div>
        <div>
          <Input
            className="text-(--bg-dark) ml-1"
            type="email"
            name="email"
            placeholder="E-mail"
            label="E-mail"
            required
            aria-required="true"
            aria-invalid={formState.errors?.emailError ? "true" : undefined}
            aria-describedby={emailErrorId}
            defaultValue={formState.enteredValues?.email}
          />
          {formState.errors?.emailError && (
            <p id="email-error" className="ml-8 mb-4 text-rose-300" role="alert">
              {formState.errors.emailError}
            </p>
          )}
        </div>
      </div>
      <div>
        <Input
          className="text-(--bg-dark) ml-1"
          type="password"
          name="password"
          placeholder="Lösenord"
          label="Lösenord"
          required
          aria-required="true"
          aria-invalid={formState.errors?.emptyPasswordError || formState.errors?.passwordLengthError ? "true" : undefined}
          aria-describedby={passwordErrorId}
          defaultValue={formState.enteredValues?.password}
        />
        {formState.errors?.emptyPasswordError && (
          <p id="password-error" className="ml-8 mb-4 text-rose-300" role="alert">
            {formState.errors.emptyPasswordError}
          </p>
        )}
        {formState.errors?.passwordLengthError && (
          <p id="password-error" className="ml-8 mb-4 text-rose-300" role="alert">
            {formState.errors.passwordLengthError}
          </p>
        )}
      </div>
      <div>
        <Input
          className="text-(--bg-dark) ml-1"
          type="password"
          name="confirmPassword"
          placeholder="Bekräfta lösenord"
          label="Bekräfta lösenord"
          required
          aria-required="true"
          aria-invalid={formState.errors?.confirmPasswordError ? "true" : undefined}
          aria-describedby={confirmPasswordErrorId}
          defaultValue={formState.enteredValues?.confirmPassword}
        />
        {formState.errors?.confirmPasswordError && (
          <p id="confirmPassword-error" className="ml-8 mb-4 text-rose-300" role="alert">
            {formState.errors.confirmPasswordError}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-3 py-2 w-full pr-3">
        <SubmitButton submitText="Skapa konto" submittingText="Skapar konto..." />
      </div>
    </form>
  );
};

export default SignupForm;
