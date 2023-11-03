import { FC, ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

const Content: FC<ContentProps> = ({ children }) => {
  return <div className="ml-72 mt-3">{children}</div>;
};

export default Content;
