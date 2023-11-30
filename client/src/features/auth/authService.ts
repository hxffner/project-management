const API_BASE_URL = "http://localhost:8080";

export interface AuthResponse {
  jwtToken: string;
  username: string;
  email: string;
  avatarPath?: string | null;
  createdAt?: string;
}

export const authService = {
  register: async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  },

  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve();
  },
};
