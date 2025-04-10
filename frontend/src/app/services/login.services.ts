import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/user/login', { email, password }).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          const role = response.usuario?.usuario_role;  
          if (role) {
            localStorage.setItem('role', role);
          }
        }
      })
    );
  }



}
