import { ChangeEvent, FC, useState } from "react";
import { Task } from "../../../types/Event";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { uploadFile } from "../../../features/event/eventSlice";
import { selectToken } from "../../../features/auth/authSlice";

type UploadFileProps = {
  task: Task;
};

const UploadFile: FC<UploadFileProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const [file, setFile] = useState<File>();

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files! && e.target.files[0]);
  };
  
  const handleFileClick = async () => {
    if (file) {
      try {
        // Dispatch the uploadFile action with the File and other necessary parameters
        await dispatch(uploadFile({ taskId: task.id, file, token: token! }));
        console.log("File uploaded successfully!");
      } catch (error) {
        console.error("File upload failed", error);
      }
    } else {
      console.error("Please select a file before uploading");
    }
  };




  return (
    <div>
      <p className="font-bold text-xl">File Upload:</p>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={fileChange}      />
      <button className="btn btn-ghost ml-2" onClick={handleFileClick}>
        Upload File
      </button>
    </div>
  );

};

export default UploadFile;
