import http from "../http-common";

class UserDataService {
  getAll(params) {
    return http.get("/users", { params });
  }
  get(id) {
    return http.get(`/users/${id}`);
  }
}

export default new UserDataService();
