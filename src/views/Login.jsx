import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const handleSignupClick = () => setIsSignup(true);
  const handleLoginClick = () => setIsSignup(false);

  return (
      <div className="flex items-center justify-center min-h-screen mt-4 mb-4">
        <div
          className="flex flex-col items-center justify-center w-full max-w-lg bg-(--bg-30) p-8 rounded-md"
          role="region"
          aria-labelledby="form-heading"
        >
          <h1 id="form-heading" className="text-2xl font-bold mb-10">
            {isSignup ? "Skapa konto" : "Logga in"}
          </h1>
          <div className="w-full max-w-md">
            {isSignup ? (
              <SignupForm onLoginClick={handleLoginClick} />
            ) : (
              <LoginForm onSignupClick={handleSignupClick} />
            )}
          </div>
        </div>
      </div>
  );
};

export default Login;
