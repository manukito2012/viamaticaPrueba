import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.usuarios = new Usuario();
      } else {
        this.accion = "update";
        this.cargarUsuario(params['id'])
        this.verSessions(params['id'])
      }
    })
  }

  //ver usuario selecionado
  cargarUsuario(id: string) {
    this.usuarioService.getUsuario(id).subscribe(
      (response) => {
        this.usuarios = response.data;
      },
      (error) => {
        alert("Error al cargar usuario: " + error);
      }
    );
  }

  verSessions(userId: string): void {
    this.usuarioService.getPublicSessions(userId).subscribe({
      next: (response: any) => {
        this.usuario = response.sesiones;
      },
      error: (error) => {
        alert('NO tiene ninguna sesion.');
        this.router.navigate(['/dashboard/usuarios']);
      }
    });
  }
}
