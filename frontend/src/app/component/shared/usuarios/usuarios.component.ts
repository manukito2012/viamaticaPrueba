import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuarios: Usuario[] = [];
  showModal: boolean = false;
  usuarioIdEliminar: string = '';

  constructor(private router: Router, private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute,

  ) {
    this.verUsuarios();
  }

  //inicializa con todos los usuarios
  verUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      result => {
        //console.log(result);
        this.usuarios = result;
      },
      (error) => {
        console.log(error);
      })
  }

  eliminarUsuario(_id: string): void {
    this.usuarioService.eliminarUsuario(_id).subscribe(
      result => {
        this.refreshPage();
      },
      error => {
        alert('Error al eliminar usuario' + error);
      }
    );
  }

  // Método para abrir el modal de confirmación
  openDeleteModal(id: string) {
    this.usuarioIdEliminar = id;
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeDeleteModal() {
    this.showModal = false;
  }


  modificarUsuario(_id: string) {
    console.log(this.usuarios);
    this.router.navigate(['/dashboard/update-user', _id]);
  }

  sesionesUsuario(_id: string) {
    console.log(this.usuarios);
    this.router.navigate(['/dashboard/sesion-user', _id]);
  }

  // Método que hace refresh ala pagina depsues del eliminar a un usuario
  refreshPage() {
    window.location.reload();
  }



}
