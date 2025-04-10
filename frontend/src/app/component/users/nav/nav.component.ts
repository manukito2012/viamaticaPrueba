import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {


  constructor(private authService: AuthService, private router: Router) { }

  //metodo de cerrar sesion y redirigir a login
  onLogout() {
    this.authService.logout();
    alert("Sesion Cerrada");
    this.router.navigate(['/login']);
  }

}
