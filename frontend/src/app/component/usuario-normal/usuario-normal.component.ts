import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { NavComponent } from "../users/nav/nav.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-normal',
  standalone: true,
  imports: [NavComponent,RouterModule],
  templateUrl: './usuario-normal.component.html',
  styleUrl: './usuario-normal.component.css'
})
export class UsuarioNormalComponent {





}
