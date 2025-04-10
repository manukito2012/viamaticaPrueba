import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuarios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBase: string = "http://localhost:3000/usuario";
  constructor(private http: HttpClient, private authService: AuthService) {

  }

  //Servicio Crear Usuario
  postUsuarios(usuario: Usuario): Observable<Usuario> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    let body = JSON.stringify(usuario);

    return this.http.post<Usuario>(this.urlBase + "/", body, httpOption);
  }


  //Servicio para ve todos los USUARIOS
  getUsuarios(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase + "/", httpOption);
  }


  //Servicio ver inicio y cierre de sesion de usuario  por su id
  getUsuarioSession(_id: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams()
        .append('_id', _id)}

    return this.http.get(this.urlBase + "/sesions/" + _id, httpOption);
  }

  //servicio para user ver su sesiones
  getPublicSessions(_id: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().append('_id', _id),
    };
    return this.http.get(this.urlBase + '/mis-sesiones/' + _id, httpOption);
  }


// Servicio de ver usuario por su id
getUsuario(id: string): Observable<any> { 
  return this.http.get<any>(`${this.urlBase}/${id}`);
}

  // Servicio para modificar usuario
  modificarUsuario(usuario: Usuario): Observable<Usuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    if (usuario.identificacion) {
      usuario.identificacion = usuario.identificacion.toString();
    }
    // Enviar la solicitud PATCH para actualizar al usuario
    return this.http.put<Usuario>(`${this.urlBase}/update/${usuario._id}`, usuario, httpOptions).pipe(
      tap(response => {

      }),
      catchError(error => {
        console.error('Error al actualizar el usuario:', error);
        throw error;
      })
    );

  }


  //serivicio para buscar usuario po rsu nombre
  filterUsuarios(params: HttpParams): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlBase}/filter`, { params });
  }


  //Metodo para cargar masiva archivo excel
  uploadUsers(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.post(this.urlBase + '/upload', formData, httpOptions);
  }

  // Método para eliminar usuario
  eliminarUsuario(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.delete(`${this.urlBase}/${id}`, httpOptions).pipe(
      tap(response => {
      }),
      catchError(error => {
        console.error('Error al eliminar el usuario:', error);
        throw error;
      })
    );
  }



}
