import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/auth/authSlice";

const HomePage: FC = () => {
  const user = useAppSelector(selectUser);
  return <div>{user ? <div>logged in</div> : <div>logged out</div>}</div>;
};

export default HomePage;
