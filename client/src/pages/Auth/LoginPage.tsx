import { FC, FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const username = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const usernameValue = username.current?.value;
    const passwordValue = password.current?.value;

    if (!usernameValue || !passwordValue) {
      toast.error("Fill in every credential!");
      return;
    }

    try {
      await dispatch(
        login({ username: usernameValue, password: passwordValue })
      );
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Wrong credentials!");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="mt-24">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-2xl font-semibold	 mb-2">Login Form</span>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-md"
          ref={username}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-md"
          ref={password}
        />
        <button type="submit" className="btn btn-block max-w-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
