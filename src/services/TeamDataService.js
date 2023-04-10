import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/teams");
  }
}

export default new UserDataService();
