import { Component } from '@angular/core';
import { LoginService } from '../../services/login.services';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage: string = '';
  failedAttempts: number = 0;
  failedLoginAttempts: { [email: string]: number } = {};

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {

  }


  userLogin() {
    if (!this.email || !this.password) {
      return;
    }
    // Verificar si este email ya alcanzó el límite de intentos
    const attempts = this.failedLoginAttempts[this.email] || 0;
    if (attempts >= 3) {
      this.errorMessage = 'Cuenta bloqueada. Comunicate con soporte.';
      alert('Cuenta bloqueada. Comunicate con soporte.');
      return;
    }

    this.loginService.loginUser(this.email, this.password).subscribe({
      next: (response) => {
        const token = response.accessToken;
        this.authService.login(token);
        // Reiniciar los intentos si el login fue exitoso
        this.failedLoginAttempts[this.email] = 0;

        const role = this.authService.getRole();
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'usuario') {
          this.router.navigate(['/user']);
        } else {
          console.error('Rol no reconocido', role);
        }
      },
      error: (err) => {
        // Aumentar el contador solo para este correo
        this.failedLoginAttempts[this.email] = attempts + 1;
        console.error('Error en login', err);

        if (err.status === 400) {
          if (err.error.message === 'Ya tienes una sesión activa') {
            this.errorMessage = 'Ya tienes una sesión activa en otro dispositivo.';
            alert('Ya tienes una sesión activa en otro dispositivo.');
          } else {
            this.errorMessage = 'Correo o contraseña incorrectos';
          }
        } else {
          this.errorMessage = 'Error en la autenticación. Intente de nuevo más tarde.';
        }
      }
    });
  }



}
