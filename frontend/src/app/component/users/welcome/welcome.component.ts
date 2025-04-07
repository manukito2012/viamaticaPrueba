import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {


  usuario: Usuario | null = null;
  sesiones: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();

    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = JSON.parse(atob(payloadBase64));


      const userId = payloadDecoded.sub || payloadDecoded.id;
      if (userId) {
        this.getUsuario(userId);
        this.getUsuarioSessions(userId);
      } else {
        console.error('El ID no es válido o no está presente en el token');
      }
    } else {
      console.error('Token no encontrado');
    }
  }

  // Método para obtener el usuario por ID
  getUsuario(_id: string): void {
    this.usuarioService.getUsuario(_id).subscribe({
      next: (response: Usuario) => {
        this.usuario = response;
      },
      error: (error) => {
        alert('Hubo un error al obtener los datos del usuario. Intenta nuevamente.');
      }
    });
  }

  //metodo obtener sesion
  getUsuarioSessions(userId: string): void {
    this.usuarioService.getPublicSessions(userId).subscribe({
      next: (sesiones) => {
        this.sesiones = sesiones;

      },
      error: (error) => {
        alert('Error al obtener las sesiones. Intenta nuevamente.');
      }
    });
  }



}
