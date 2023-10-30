import { FC } from "react";

const RegisterPage: FC = () => {
  return (
    <div className="mt-24">
      <form className="flex flex-col items-center gap-2">
        <span className="text-2xl font-semibold mb-2">Register Form</span>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-md"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="input input-bordered w-full max-w-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-md"
        />
        <input
          type="password"
          placeholder="Password Again"
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn ">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;