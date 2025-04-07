import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-update',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuarios-update.component.html',
  styleUrl: './usuarios-update.component.css'
})
export class UsuariosUpdateComponent {

  usuario = new Usuario();
  accion: string = "";

  constructor(private router: Router, private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.usuario = new Usuario();
      } else {
        this.accion = "update";
        this.cargarUsuario(params['id'])
      }
    })
  }


  // Asegura de que en el método cargarUsuario se está tomando el 'id' correcto
  cargarUsuario(id: string) {
    this.usuarioService.getUsuario(id).subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        alert("Error al cargar usuario: " + error);
      }
    );
  }

  modificarUsuario() {
    const datosActualizados: any = {};

    if (this.usuario.status) datosActualizados.status = this.usuario.status;
    if (this.usuario.role) datosActualizados.role = this.usuario.role;

    if (this.usuario._id) datosActualizados._id = this.usuario._id;
    if (this.usuario.nombre) datosActualizados.nombre = this.usuario.nombre;
    if (this.usuario.email) datosActualizados.email = this.usuario.email;
    if (this.usuario.identificacion) datosActualizados.identificacion = this.usuario.identificacion.toString();

    this.usuarioService.modificarUsuario(datosActualizados).subscribe(
      response => {
        this.router.navigate(['/dashboard/usuarios']);
        console.log('👤 Datos enviados:', datosActualizados);

      },
      error => {
        console.log('❌ Error al actualizar el usuario:', error);
        console.log('🔴 Respuesta completa del backend:', JSON.stringify(error, null, 2));
      }
    );
  }

  volverWelcome(): void {
    this.router.navigate(['/dashboard/']);
  }


}
