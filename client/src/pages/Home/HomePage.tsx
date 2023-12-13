import { FC, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const HomePage: FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    user ? navigate("/calendar") : navigate("/register");
  });

  return <div>{user ? <div>logged in</div> : <div>logged out</div>}</div>;
};

export default HomePage;
