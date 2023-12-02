const API_BASE_URL = "http://localhost:8080";

export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  // relatedTasks: Task[];
  // projectMembers: string;
  startDate: string;
  endDate: string;
  dueDate: string;
}

export const projectService = {
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
