import http from "../http-common";

class OrderDataService {
  getAll() {
    return http.get("/orders");
  }
  get(id) {
    return http.get(`/orders/${id}`);
  }

  create(data) {
    return http.post("/orders", data);
  }

  update(id, data) {
    return http.put(`/orders/${id}`, data);
  }

  delete(id) {
    return http.delete(`/orders/${id}`);
  }
}

export default new OrderDataService();
