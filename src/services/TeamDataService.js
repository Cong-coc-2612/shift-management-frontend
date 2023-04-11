import http from "../http-common";

class TeamDataService {
  getAll() {
    return http.get("/teams");
  }
}

export default new TeamDataService();
