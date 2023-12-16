import { FC, FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import {
  deleteProject,
  updateProject,
} from "../../../features/project/projectSlice";
import { ProjectResponse } from "../../../features/project/projectService";

type ProjectSettingsModalProps = {
  project: ProjectResponse;
};

const ProjectSettingsModal: FC<ProjectSettingsModalProps> = ({ project }) => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const name = useRef<HTMLInputElement | null>(null);
  const desc = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nameValue = name.current?.value;
    const descValue = desc.current?.value;

    if (nameValue === undefined || descValue === undefined) {
      toast.error("Fill in every detail!");
      return;
    }

    const updatedProject = {
      ...project,
      name: nameValue,
      description: descValue,
    };

    dispatch(updateProject({ project: updatedProject, token: token! }));
  };

  const handleDeleteProject = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!token) {
      console.error("Token is null. Unable to delete project.");
      return;
    }

    try {
      await dispatch(deleteProject({ id: project.id, token }));
    } catch (error) {
      console.error("Error deleting project:", error);
    }

    toast.success("Project successfully deleted!");
    navigate("/project");
  };

  return (
    <div>
      <dialog id="project_settings_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 items-center">
              <h1 className="font-bold text-xl">Project Settings</h1>
              <input
                type="text"
                placeholder={project.name}
                defaultValue={project.name}
                className="input input-bordered w-full max-w-xs"
                ref={name}
              />
              <input
                type="text"
                placeholder={project.description}
                defaultValue={project.description}
                className="input input-bordered w-full max-w-xs"
                ref={desc}
              />
              <button type="submit" className="btn btn-block max-w-xs">
                Save
              </button>
              <button
                className="btn btn-block btn-error max-w-xs"
                onClick={handleDeleteProject}
              >
                Delete Project
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProjectSettingsModal;
