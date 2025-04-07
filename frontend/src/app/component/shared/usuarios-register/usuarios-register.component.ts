import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ) {

  }

  //Metodo para Crear Usuarios
  crearUsuario(): void {

    if (!this.usuario.email || this.usuario.email.trim() === '') {
      this.usuario.email = null;
    }
    this.usuarioService.postUsuarios(this.usuario).subscribe(
      (result) => {
        alert("Usuario registrado con éxito.");
        this.router.navigate(['/dashboard/usuarios']);
      },
      error => {
        alert("Error: " + error.message);
      });
  }

}
