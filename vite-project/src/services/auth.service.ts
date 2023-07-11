import axios from "axios";

const API_URL = "http://localhost:4000/api/";

class AuthService {
  login(roomId: string, roomPassword: string) {
    return axios
      .post(API_URL + "login", {
        roomId,
        roomPassword
      })
      // access local storage and check if information is correct if token is implemented
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("roomId", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  register(roomId: string, roomPassword: string, email: string) {
    return axios.post(API_URL + "register", {
      roomId,
      roomPassword,
      email
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("roomId");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
