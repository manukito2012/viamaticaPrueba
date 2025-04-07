import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuarios';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './welcome-admin.component.html',
  styleUrl: './welcome-admin.component.css'
})
export class WelcomeAdminComponent {

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


  getUsuarioSessions(userId: string): void {
    this.usuarioService.getPublicSessions(userId).subscribe({
      next: (sesiones) => {
        this.sesiones = sesiones;
      },
      error: (error) => {
        console.error('Error al obtener las sesiones:', error);
      }
    });
  }


  // Método para obtener el  ID
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

}
