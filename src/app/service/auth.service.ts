import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8095/auth'; // Asegúrate de que la URL coincida con tu backend

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/nuevo`, { username, password, email });
  }

  createAdminUser(): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-admin-user`, {});
  }

  logout(): void {
    // Aquí puedes manejar la lógica de logout
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Aquí puedes manejar la lógica para verificar si el usuario está autenticado
    return !!localStorage.getItem('user');
  }

  getUserDetails(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}