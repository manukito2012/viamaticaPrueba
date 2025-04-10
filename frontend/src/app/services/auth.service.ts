import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { decodeToken } from '../utils/jwt.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase: string = "http://localhost:3000/usuario";
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
    console.log('Token guardado:', token);
  }

  // Obtener token
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Usar decodeToken para obtener el rol del token
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedPayload = decodeToken(token);
      return decodedPayload ? decodedPayload.usuario_role || null : null;
    }
    return null;
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    console.log('Token desde getToken:', token);
    if (token) {
      const decodedPayload = decodeToken(token);
      console.log('Decoded Payload:', decodedPayload);
      return decodedPayload ? decodedPayload.usuario_id || null : null;
    }
    return null;
  }


  logout() {
    const userId = this.getUserIdFromToken();
    if (!userId) {
      sessionStorage.removeItem(this.tokenKey);
      return;
    }
    this.http.post(`${this.urlBase}logout/${userId}`, {}).subscribe({
      next: () => {
        sessionStorage.removeItem(this.tokenKey);
      },
      error: (err) => {
        sessionStorage.removeItem(this.tokenKey);
      }
    });
  }


}
