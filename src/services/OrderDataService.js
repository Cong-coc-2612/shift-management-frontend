import http from "../http-common";

class OrderDataService {
  getAll() {
    return http.get("/orders");
  }
}

export default new OrderDataService();
