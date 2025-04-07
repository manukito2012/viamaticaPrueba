
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
      // Verifica si tienes el rol guardado
      const role = this.authService.getRole();  
    
      if (role === 'admin' || role === 'usuario') { 
        return true;
      }
     // Si no tiene acceso, redirigir a login
      this.router.navigate(['/login']); 
      return false;
    }



    
  }    