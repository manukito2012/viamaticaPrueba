import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UsuariosComponent } from './component/shared/usuarios/usuarios.component';
import { UsuariosRegisterComponent } from './component/shared/usuarios-register/usuarios-register.component';
import { UsuariosUpdateComponent } from './component/shared/usuarios-update/usuarios-update.component';
import { SesionesUsuarioComponent } from './component/shared/sesiones-usuario/sesiones-usuario.component';
import { UpdateComponent } from './component/shared/update/update.component';
import { CargarchivosComponent } from './component/shared/cargarchivos/cargarchivos.component';
import { UsuarioNormalComponent } from './component/usuario-normal/usuario-normal.component';
import { UpdateUserComponent } from './component/users/update-user/update-user.component';
import { WelcomeComponent } from './component/users/welcome/welcome.component';
import { UpdateAdminComponent } from './component/dashboard/update-admin/update-admin.component';

export const routes: Routes = [


    { path: 'login', component: LoginComponent },
    {
        path: 'user', component: UsuarioNormalComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: WelcomeComponent },
            { path: 'update-user', component: UpdateUserComponent },


        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [  
            { path: '', component: WelcomeComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'registrar', component: UsuariosRegisterComponent },
            { path: 'update-admin', component: UpdateAdminComponent },
            { path: 'update-user', component: UsuariosUpdateComponent },
            { path: 'update-user/:id', component: UsuariosUpdateComponent },
            { path: 'sesion-user', component: SesionesUsuarioComponent },
            { path: 'sesion-user/:id', component: SesionesUsuarioComponent },
            { path: 'search', component: UpdateComponent },
            { path: 'fileExcel', component: CargarchivosComponent },
        ]
    }
];
