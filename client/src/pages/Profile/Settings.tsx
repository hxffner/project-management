import { FC, FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectToken, selectUser, updateUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { User } from "../../types/User";

const Settings: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const currentUser = useAppSelector(selectUser);

  const profilePictureRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedUser: User = {
      userId: currentUser?.userId || "",
      username: usernameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || ""
    };

    try {
      await dispatch(updateUser({ user: updatedUser, token: token! }));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Profile update failed");
      console.error("Profile update failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center m-24">
      <div className="w-80">
        <p>Upload Profile Picture</p>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          ref={profilePictureRef}
        />
      </div>

      <div className="w-80">
        <p>Change Username</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          ref={usernameRef}
        />
      </div>

      <div className="w-80">
        <p>Change Email</p>
        <input
          type="email"
          placeholder="Type here"
          ref={emailRef}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="w-80">
        <p>Change Password</p>
        <input
          type="password"
          placeholder="Type here"
          ref={passwordRef}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="w-80 m-8">
        <button className="btn w-80">Change</button>
      </div>
    </form>
  );
};

export default Settings;
