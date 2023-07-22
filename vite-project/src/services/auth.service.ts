import axios from "axios";

class AuthService {
  private API_BASE_URL: string;

  constructor() {
    this.API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
  }

  register(roomId: string, roomPassword: string, emails: string) {
    return axios.post(`${this.API_BASE_URL}/api/register`, {
      roomId,
      roomPassword,
      emails,
    });
  }
}

export default new AuthService();
