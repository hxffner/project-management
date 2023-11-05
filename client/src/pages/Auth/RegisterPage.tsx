import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  email: string;
  pwd1: string;
  pwd2: string;
}

const RegisterPage: FC = () => {
  const [values, setValues] = useState<FormValues>({
    username: "",
    email: "",
    pwd1: "",
    pwd2: "",
  });
  const navigate = useNavigate();

  const register = (uservalues: FormValues): void => {
    console.log("succesfull register: " + uservalues.username);
    navigate("/calendar");
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    // TODO: verify datas
    if (!validateEmail(values.email)) {
      alert("email is not valid");
    }
    if (values.pwd1 !== values.pwd2) {
      alert("passwords are not the same");
      return;
    }

    register(values);
  };

  const validateEmail = (input: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(input);
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
        className="flex flex-col items-center gap-2"
        onSubmit={handleSubmit}
      >
        <span className="text-2xl font-semibold mb-2">Register Form</span>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-md"
          id="username"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="input input-bordered w-full max-w-md"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-md"
          id="pwd1"
          name="pwd1"
          value={values.pwd1}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password Again"
          className="input input-bordered w-full max-w-md"
          id="pwd2"
          name="pwd2"
          value={values.pwd2}
          onChange={handleChange}
        />
        <button type="submit" className="btn ">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
