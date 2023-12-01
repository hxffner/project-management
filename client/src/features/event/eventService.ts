const API_BASE_URL = "http://localhost:8080";

export interface EventResponse {
  id: string;
  project: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export const eventService = {
  createEvent: async (
    name: string,
    description: string,
    token: string
  ): Promise<EventResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/calendar-entries`, {
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
    console.log(token);
    

    return response.json();
  },
};
