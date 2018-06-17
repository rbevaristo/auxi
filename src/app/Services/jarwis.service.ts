import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl = 'http://localhost:8000/api';
  constructor(private http:HttpClient) { }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);

  }

  register(data) {
    return this.http.post(`${this.baseUrl}/register`, data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }

  facebook(data) {
    return this.http.post(`${this.baseUrl}/login/facebook`, data);
  }

  verifyEmail(data) {
    return this.http.post(`${this.baseUrl}/user/verify/`,data);
  }

}
