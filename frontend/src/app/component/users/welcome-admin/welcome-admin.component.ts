import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuarios';
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

  usuario: Usuario = new Usuario();
  sesiones: Usuario[] = [];
  
  constructor(private usuarioService: UsuarioService) { }
    
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

}
