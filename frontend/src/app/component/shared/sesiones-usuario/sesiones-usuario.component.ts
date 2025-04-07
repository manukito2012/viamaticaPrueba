import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sesiones-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sesiones-usuario.component.html',
  styleUrl: './sesiones-usuario.component.css'
})
export class SesionesUsuarioComponent {

  usuario: Usuario[] = [];
  accion: string = "";
  usuarios: Usuario = new Usuario()

  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.usuarios = new Usuario();
      } else {
        this.accion = "update";
        this.verSesionesUsuarios(params['id'])
        this.cargarUsuario(params['id'])
      }
    })
  }

  //ver usuario selecionado
  cargarUsuario(id: string) {
    console.log('Cargando usuario con ID:', id);
    this.usuarioService.getUsuario(id).subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        alert("Error al cargar usuario: " + error);
      }
    );
  }


  //ver Sesiones de Usuarios
  verSesionesUsuarios(id: string): void {
    this.usuarioService.getUsuarioSession(id).subscribe(
      result => {
        this.usuario = result;
      },
      (error) => {
        console.log(error);
      })
  }

}
