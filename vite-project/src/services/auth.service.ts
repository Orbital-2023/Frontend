import axios from "axios";

class AuthService {
  register(roomId: string, roomPassword: string, emails: string) {
    return axios.post("/api/register", {
      roomId,
      roomPassword,
      emails
    });
  }
}

export default new AuthService();
