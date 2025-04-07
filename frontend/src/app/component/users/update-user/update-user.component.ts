import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  user = new Usuario();
  accion: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
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
        alert("USUARIO ACTUALIZADO " ); 
      },
      error => {
        console.log('❌ Error al actualizar el usuario:', error);  
      }
    );
  }

  volverInicio():void{
    this.router.navigate(['/user']);
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
