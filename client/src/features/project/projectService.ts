const API_BASE_URL = "http://localhost:8080";

export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  relatedTasks: string[];
  projectMembers: string;
  startDate: string;
  endDate: string;
  dueDate: string;
}

export const projectService = {
  getProjectsByUserId: async (
    userId: string,
    token: string
  ): Promise<ProjectResponse[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/projects/by_user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch projects for user with ID ${userId}`);
    }

    return response.json();
  },

  getProjectById: async (
    id: string,
    token: string
  ): Promise<ProjectResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project with ID ${id}`);
    }

    return response.json();
  },

  getProjects: async (token: string): Promise<ProjectResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return response.json();
  },

  createProject: async (
    name: string,
    description: string,
    // startDate: string,
    // endDate: string,
    token: string
  ): Promise<ProjectResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      throw new Error("Event creation failed");
    }

    return response.json();
  },

  deleteProject: async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete project with ID ${id}`);
    }
  },
};
