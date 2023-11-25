import { FC } from "react";

const Settings: FC = () => {
  return (
    <div className="flex flex-col items-center m-24">
      <div className="w-80">
        <p>Upload Profile Picture</p>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </div>

      <div className="w-80">
        <p>Change Username</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="w-80">
        <p>Change Email</p>
        <input
          type="email"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="w-80">
        <p>Change Password</p>
        <input
          type="password"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="w-80 m-8">
        <button className="btn w-80">Change</button>
      </div>
    </div>
  );
};

export default Settings;
