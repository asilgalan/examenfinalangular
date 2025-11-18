import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
{
    path:'',
loadComponent:() => import('./components/home/home').then(h => h.Home)
}, 
{
    path:'marca/:marca',
    loadComponent:() => import('./components/marca/marca').then(h => h.Marca)
},
{
    path:'login',
loadComponent:() => import('./components/login/login').then(h => h.Login)

}, 

{
    path:'perfil',
    loadComponent:() => import('./components/perfilusuario/perfilusuario').then(h => h.Perfilusuario),
     canMatch:[AuthenticatedGuard]

}, 
{
    path:'misCompras',
    loadComponent:() => import('./components/miscompras/miscompras').then(h => h.Miscompras),
     canMatch:[AuthenticatedGuard]

}, 



];
