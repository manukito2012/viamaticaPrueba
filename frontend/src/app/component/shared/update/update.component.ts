import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  busqueda: string = '';
  usuarios: Usuario[] = [];
  searchRealizada: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  // Método para buscar usuarios
  buscarUsuarios() {
    const filterDto: any = {};
    this.searchRealizada = true;

    if (!this.busqueda) {
      this.usuarios = [];
      return;
    }

    const identificacionValida = /^[0-9]{10}$/.test(this.busqueda);

    if (identificacionValida) {
      filterDto.identificacion = this.busqueda;
    } else {

      filterDto.nombre = this.busqueda;
    }

    let params = new HttpParams();

    // Agregar los filtros de búsqueda a la URL
    if (filterDto.nombre) {
      params = params.append('nombre', filterDto.nombre);
    }
    if (filterDto.apellido) {
      params = params.append('apellido', filterDto.apellido);
    }
    if (filterDto.identificacion) {
      params = params.append('identificacion', filterDto.identificacion);
    }

    console.log('Parámetros enviados:', params.toString());

    // Enviar la solicitud al servicio para obtener los usuarios filtrados
    this.usuarioService.filterUsuarios(params).subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }




}
