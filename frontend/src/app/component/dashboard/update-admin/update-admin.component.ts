import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuarios';
import { Router } from '@angular/router';
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
  accion: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router, private usuarioService: UsuarioService, private authService: AuthService,
  ) { }


    ngOnInit(): void {
      const userId = this.authService.getUserIdFromToken(); 
      if (userId) {
        this.getUsuario(userId);
      } else {
        console.error('No se pudo obtener el ID del usuario desde el token');
      }
    }
    
  
  

 // Método para modificar el usuario
 modificarUsuario() {
  const datosActualizados: any = {};
  if (this.usuario._id) datosActualizados._id = this.usuario._id;
  if (this.usuario.nombre) datosActualizados.nombre = this.usuario.nombre;
  if (this.usuario.apellido) datosActualizados.apellido = this.usuario.apellido;
  if (this.usuario.email) datosActualizados.email = this.usuario.email;
  if (this.usuario.identificacion) datosActualizados.identificacion = this.usuario.identificacion.toString();
  if (this.usuario.status) datosActualizados.status = this.usuario.status;
  if (this.usuario.role) datosActualizados.role = this.usuario.role;

  this.usuarioService.modificarUsuario(datosActualizados).subscribe(
    response => {
      alert('ADMIN ACTUALIZADO');
    },
    error => {
      console.error('Error al actualizar usuario:', error);
    }
  );
}


  volverInicio(): void {
    this.router.navigate(['dashboard/']);
  }

  getUsuario(_id: string): void {
    this.usuarioService.getUsuario(_id).subscribe({
      next: (response: any) => {
        this.usuario = response.data;
      },
      error: (error) => {
        alert('Hubo un error al obtener los datos del usuario. Intenta nuevamente.');
        console.error('Error al obtener usuario:', error);
      }
    });}


}
