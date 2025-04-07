import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  usuario = new Usuario();
  user = new Usuario();
  accion: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private usuarioService: UsuarioService) {


  }



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


  onLogout() {
    this.authService.logout();
    alert('SESION CERRADO')
    this.router.navigate(['/login']);
  }

}
