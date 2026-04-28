import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HBGQ7VAX.js";

// src/app/services/certificate.service.ts
var CertificateService = class _CertificateService {
  http;
  api = "http://localhost:8090/api/certificates";
  constructor(http) {
    this.http = http;
  }
  getMyCertificates() {
    return this.http.get(`${this.api}/me`);
  }
  downloadCertificate(id) {
    return this.http.get(`${this.api}/${id}/download`, {
      responseType: "blob"
    });
  }
  verify(token) {
    return this.http.get(`http://localhost:8090/api/verify/${token}`);
  }
  static \u0275fac = function CertificateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CertificateService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CertificateService, factory: _CertificateService.\u0275fac, providedIn: "root" });
};

export {
  CertificateService
};
//# sourceMappingURL=chunk-7IY2EMT3.js.map
