import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-cargarchivos',
  standalone: true,
  imports: [],
  templateUrl: './cargarchivos.component.html',
  styleUrl: './cargarchivos.component.css'
})
export class CargarchivosComponent {

  selectedFile: File | null = null;
  mensaje: string = '';

  constructor(private usuarioService: UsuarioService) {

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

  }

  // Método para subir el archivo
  onUpload(): void {
    if (!this.selectedFile) {
      window.alert('Por favor, selecciona un archivo para cargar.');
      return;
    }
    this.usuarioService.uploadUsers(this.selectedFile).subscribe(
      (response: any) => {
        this.mensaje = response.message;
        window.alert('LISTA DE USUARIOS CARGADOS.');
      },
      (error) => {
        window.alert('¡Error al cargar el archivo!');
      }
    );
  }


}