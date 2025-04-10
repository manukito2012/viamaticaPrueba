import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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

  //metodo de  cargar usuario
  cargarUsuario(id: string) {
    this.usuarioService.getUsuario(id).subscribe(
      (response) => {
        this.usuario = response.data;
      },
      (error) => {
        alert('Error al cargar usuario: ' + error);
      }
    );
  }

  modificarUsuario() {
    const datosActualizados: Usuario = {
      _id: this.usuario._id,
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      email: this.usuario.email || "",
      identificacion: this.usuario.identificacion.toString(),
      status: this.usuario.status,
      role: this.usuario.role,
      event: this.usuario.event || "",
      password: this.usuario.password || "",
    };

    this.usuarioService.modificarUsuario(datosActualizados).subscribe(
      (response: Usuario) => {
        alert('Usuario Actualizado');
        this.router.navigate(['/dashboard/usuarios']);
      },
      (error) => {
        alert('Error al actualizar el usuario: ' + error);
      }
    );
  }


  volverWelcome(): void {
    this.router.navigate(['/dashboard/usuarios']);
  }

}
