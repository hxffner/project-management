import { FC, useRef, FormEvent } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { register } from "../../features/auth/authSlice";

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const username = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const confirmPassword = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const usernameValue = username.current?.value;
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;
    const confirmPasswordValue = confirmPassword.current?.value;

    if (
      !usernameValue ||
      !emailValue ||
      !passwordValue ||
      !confirmPasswordValue
    ) {
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      return;
    }

    try {
      await dispatch(
        register({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        })
      );
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-24">
      <div className="flex flex-col items-center mt-8 gap-2">
        <span className="text-2xl font-semibold mb-2">Register Form</span>
        <input
          type="text"
          placeholder="Username"
          ref={username}
          className="input input-bordered w-full max-w-md"
        />

        <input
          type="email"
          placeholder="Email"
          ref={email}
          className="input input-bordered w-full max-w-md"
        />

        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="input input-bordered w-full max-w-md"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPassword}
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn btn-block max-w-md">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;
