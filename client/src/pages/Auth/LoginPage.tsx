import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  user: string;
  pwd: string;
}

const LoginPage: FC = () => {
  const [values, setValues] = useState<FormValues>({ user: "", pwd: "" });
  const navigate = useNavigate();

  const login = (user: string): void => {
    console.log("succesfull login: " + user);
    navigate("/calendar");
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (values.pwd !== "pwd1" && values.user !== "user1") {
      alert("Incorrect password or username!");
      return;
    }

    login(values.user);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
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
          id="user"
          name="user"
          value={values.user}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-md"
          id="password"
          name="pwd"
          value={values.pwd}
          onChange={handleChange}
        />
        <button type="submit" className="btn ">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
