import { Task } from "../../types/Event";
import { ProjectResponse } from "../project/projectService";

const API_BASE_URL = "http://localhost:8080";

export interface EventResponse {
  id: string;
  project: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const eventService = {
  createTask: async (
    project: ProjectResponse,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    token: string
  ): Promise<EventResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project, name, description, startDate, endDate }),
    });

    if (!response.ok) {
      throw new Error("Event creation failed");
    }

    return response.json();
  },

  updateTask: async (
    updatedTask: Task,
    token: string
  ): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/api/task/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error("Task update failed");
    }

    return response.json();
  },

  deleteTaskById: async (taskId: number, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/task/delete/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Task deletion failed");
    }
  },

  createEvent: async (
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    token: string
  ): Promise<EventResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/event/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, startDate, endDate }),
    });

    if (!response.ok) {
      throw new Error("Event creation failed");
    }

    return response.json();
  },

  getTasksByProjectId: async (
    projectId: string,
    token: string
  ): Promise<Task[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/task/by_project/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tasks by project ID");
    }

    return response.json();
  },
};
