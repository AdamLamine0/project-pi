import {
  HttpClient,
  __async,
  firstValueFrom,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HBGQ7VAX.js";

// src/app/core/services/user.service.ts
var UserService = class _UserService {
  http;
  apiUrl = "http://localhost:8090/api/users";
  constructor(http) {
    this.http = http;
  }
  getAllUsers() {
    return __async(this, null, function* () {
      return firstValueFrom(this.http.get(this.apiUrl));
    });
  }
  getUserById(id) {
    return __async(this, null, function* () {
      return firstValueFrom(this.http.get(`${this.apiUrl}/${id}`));
    });
  }
  // ← requestingUserId added, X-User-Id header now sent
  updateUser(user, requestingUserId) {
    return __async(this, null, function* () {
      return firstValueFrom(this.http.put(this.apiUrl, user, {
        headers: { "X-User-Id": String(requestingUserId) }
      }));
    });
  }
  deleteUser(id) {
    return __async(this, null, function* () {
      return firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
    });
  }
  createUser(request) {
    return __async(this, null, function* () {
      return firstValueFrom(this.http.post(`${this.apiUrl}/admin/create`, request));
    });
  }
  setPassword(id, password) {
    return __async(this, null, function* () {
      return firstValueFrom(this.http.post(`${this.apiUrl}/${id}/set-password`, { password }, {
        responseType: "text"
      }));
    });
  }
  changePassword(id, oldPassword, newPassword) {
    return __async(this, null, function* () {
      return firstValueFrom(this.http.put(`${this.apiUrl}/${id}/change-password`, {
        oldPassword,
        newPassword
      }));
    });
  }
  static \u0275fac = function UserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
};

export {
  UserService
};
//# sourceMappingURL=chunk-RUCCUJGV.js.map
