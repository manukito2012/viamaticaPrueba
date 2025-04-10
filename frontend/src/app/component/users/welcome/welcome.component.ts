import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  usuario: Usuario | null = null;
  sesiones: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.getUsuario(userId);
      this.getUsuarioSessions(userId);
    } else {
    }
  }

  // Método para obtener el usuario por ID
  getUsuario(_id: string): void {
    this.usuarioService.getUsuario(_id).subscribe({
      next: (response: any) => {
        this.usuario = response.data;
      },
      error: (error) => {
        alert('Hubo un error al obtener los datos del usuario. Intenta nuevamente.');
      }
    });
  }

  getUsuarioSessions(userId: string): void {
    this.usuarioService.getPublicSessions(userId).subscribe({
      next: (response: any) => {
        this.sesiones = response.sesiones;
      },
      error: (error) => {
        alert('Error al obtener las sesiones. Intenta nuevamente.');
      }
    });
  }

}
