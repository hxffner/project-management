import { FC } from "react";

const ProfilePage: FC = () => {
  return (
    <div className="flex items-center flex-col">
      <div className="avatar">
        <div className="w-52 rounded">
          <img src="https://e3.365dm.com/18/03/736x414/skynews-tony-soprano-james-gandolfini_4253599.jpg?20190110140558" />
        </div>
      </div>
      <h2 className="ml-4 text-lg font-semibold">Tony Soprano</h2>
    </div>
  );
};

export default ProfilePage;
