import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GuardService as guard } from './services/guard.service';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';
import { BuscadorLibroComponent } from './components/buscador-libro/buscador-libro.component';

// Nuevos componentes (Ejemplo: AdminLibrosComponent, BookEditComponent, etc.)
import { BookFormComponent } from './components/book-form/book-form.component';
import { AdminGenerosComponent } from './components/admin/admin-generos/admin-generos.component';
import { AdminLibrosComponent } from './components/admin/admin-libros/admin-libros.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';

// <-- Agrega el import del componente de detalle de libro -->
import { BookComponent } from './components/book/book.component';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'admin-usuarios', component: AdminUsuariosComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'search/:busqueda', component: BuscadorLibroComponent },

  // Rutas para los nuevos componentes
  { path: 'new-book', component: BookFormComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: "admin-generos", component: AdminGenerosComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: "admin-libros", component: AdminLibrosComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: "edit-book/:id", component: BookEditComponent, canActivate: [guard], data: { expectedRol: ['admin']}},


  { path: 'libro/:id', component: BookComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home' },

  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}