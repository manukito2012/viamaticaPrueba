import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase: string = "http://localhost:3000/auth/";
  private tokenKey = 'token';


  constructor(private http: HttpClient) { }


  login(token: string) {
    // Verifica el token antes de guardarlo
    /* console.log('Token guardado:', token); */
    sessionStorage.setItem(this.tokenKey, token);
  }

  // Obtener token
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }



  getRole(): string | null {
    const token = this.getToken();
    if (token && token.split('.').length === 3) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        // Devuelve el rol o null si no lo encuentra
        return decodedPayload.role || null;
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  }

  // Obtener el userId desde el token
  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token && token.split('.').length === 3) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload.sub || decodedPayload.id || null;
      } catch (error) {
        console.error('Error al decodificar el token', error);
        return null;
      }
    }
    return null;
  }


  // Cerrar sesión
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
        // Por seguridad, igual quitamos el token
        sessionStorage.removeItem(this.tokenKey);
      }
    });
  }


}
