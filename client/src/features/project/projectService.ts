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
};
