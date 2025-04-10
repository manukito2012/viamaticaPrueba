import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-register.component.html',
  styleUrl: './usuarios-register.component.css'
})
export class UsuariosRegisterComponent {

  usuario = new Usuario();

  constructor(private router: Router, private usuarioService: UsuarioService,
  ) { }

  // Método para Crear Usuarios
  crearUsuario(): void {
    if (!this.usuario.email || this.usuario.email.trim() === '') {
      delete this.usuario.email;
    }
    this.usuarioService.postUsuarios(this.usuario).subscribe(
      (result) => {
        alert("Usuario registrado con éxito.");
        this.router.navigate(['/dashboard/usuarios']);
      },
      error => {
        alert("Error:Al crear Usuario-Faltan datos a completar ");
      }
    );
  }

}
