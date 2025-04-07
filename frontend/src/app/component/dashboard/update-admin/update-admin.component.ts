import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-admin.component.html',
  styleUrl: './update-admin.component.css'
})
export class UpdateAdminComponent {

  usuario = new Usuario();
  user = new Usuario();
  accion: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router, private usuarioService: UsuarioService, private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // Obtenemos el ID desde el token
    const token = this.authService.getToken();
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = JSON.parse(atob(payloadBase64));

      const userId = payloadDecoded.sub || payloadDecoded.id;
      if (userId) {
        console.log('ID desde el token:', userId);
        this.getUsuario(userId);
        this.usuario._id = userId;
        this.cargarUsuario(userId);
      } else {
        console.error('El ID no es válido o no está presente en el token');
      }
    } else {
      console.error('Token no encontrado');
    }
  }

  // Método para cargar el usuario desde el servidor
  cargarUsuario(id: string): void {
    this.usuarioService.getUsuario(id).subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        alert("Error al cargar usuario: " + error);
      }
    );
  }

  // Método para modificar el usuario
  modificarUsuario() {

    const datosActualizados: any = {};

    if (this.usuario._id) datosActualizados._id = this.usuario._id;
    if (this.usuario.nombre) datosActualizados.nombre = this.usuario.nombre;
    if (this.usuario.email) datosActualizados.email = this.usuario.email;
    if (this.usuario.identificacion) datosActualizados.identificacion = this.usuario.identificacion.toString();

    this.usuarioService.modificarUsuario(datosActualizados).subscribe(
      response => {
        alert("USUARIO ACTUALIZADO ");

      },
      error => {
        console.log('🔴 Respuesta completa del backend:', JSON.stringify(error, null, 2));
      }
    );
  }

  volverInicio(): void {
    this.router.navigate(['dashboard/']);
  }



  // Método para obtener el usuario por ID
  getUsuario(_id: string): void {
    this.usuarioService.getUsuario(_id).subscribe({
      next: (response: Usuario) => {
        this.user = response;
      },
      error: (error) => {
        alert('Hubo un error al obtener los datos del usuario. Intenta nuevamente.');
      }
    });
  }


}
