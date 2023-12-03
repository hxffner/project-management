import { FC } from "react";
import { ProjectResponse } from "../../../features/project/projectService";
import { Link } from "react-router-dom";

type ProjectProps = {
  project: ProjectResponse;
};

const Project: FC<ProjectProps> = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`}>
      <div className="bg-base-100 hover:bg-base-200 rounded-md p-2">
        <div className="ml-4 text-xl">{project.name}</div>
        <div className="ml-8">- {project.description}</div>
      </div>
    </Link>
  );
};

export default Project;
