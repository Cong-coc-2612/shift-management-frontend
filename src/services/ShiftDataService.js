import http from "../http-common";

class ShiftDataService {
  getAll(params) {
    return http.get("/shifts", { params });
  }

  get(id) {
    return http.get(`/shifts/${id}`);
  }

  create(data) {
    return http.post("/shifts", data);
  }

  update(id, data) {
    return http.put(`/shifts/${id}`, data);
  }

  updateStatus(id, status) {
    return http.put(`/shifts/${id}/status?status=${status}`);
  }

  delete(id) {
    return http.delete(`/shifts/${id}`);
  }

  deleteAll() {
    return http.delete(`/shifts`);
  }
}

export default new ShiftDataService();
