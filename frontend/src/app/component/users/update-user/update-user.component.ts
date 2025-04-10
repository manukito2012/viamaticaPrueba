import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {

  usuario = new Usuario();
  accion: string = '';
  showPassword: boolean = false;

  constructor(private router: Router,private usuarioService: UsuarioService, private authService: AuthService,) { }

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
    if (this.usuario.email) datosActualizados.email = this.usuario.email;
    if (this.usuario.identificacion) datosActualizados.identificacion = this.usuario.identificacion.toString(); 

    this.usuarioService.modificarUsuario(datosActualizados).subscribe(
      response => {
        alert("USUARIO ACTUALIZADO " ); 
        this.router.navigate(['/user']);
      },
      error => {
        console.log('❌ Error al actualizar el usuario:', error);  
      }
    );
  }

  volverInicio():void{
    this.router.navigate(['/user']);
  }

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
