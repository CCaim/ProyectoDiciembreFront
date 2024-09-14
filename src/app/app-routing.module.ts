import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosComponent } from './components/libros/libros.component';
import { LibroComponent } from './components/libro/libro.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GuardService as guard } from './services/guard.service';
import { AdminLibrosComponent } from './components/admin/admin-libros/admin-libros.component';
import { AdminIngredientesComponent } from './components/admin/admin-ingredientes/admin-ingredientes.component';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';
import { LibroEditComponent } from './components/libro-edit/libro-edit.component';
import { BuscadorlibroComponent } from './components/buscador-libro/buscador-libro.component';

const routes: Routes = [
  {path:"home", component:LibrosComponent},
  {path:"libro/:id", component:LibroComponent},
  {path:"newLibro", component:LibroFormComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
  {path:"editLibro/:id", component:LibroEditComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"admin-libros", component:AdminLibrosComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  {path:"admin-ingredientes", component: AdminIngredientesComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  {path:"admin-usuarios", component:AdminUsuariosComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  {path:"search/:busqueda", component:BuscadorlibroComponent},
  {path:"**", pathMatch:"full", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
