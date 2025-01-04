import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GuardService as guard } from './service/guard.service';
import { AdminLibrosComponent } from './components/admin/admin-libros/admin-libros.component';
import { AdminGenerosComponent } from './components/admin/admin-generos/admin-generos.component';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookSearcherComponent } from './components/book-searcher/book-searcher.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {path:"home", component:MainPageComponent},
  {path:"libro/:id", component:BookComponent},
  {path:"newLibro", component:BookFormComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
  {path:"editLibro/:id", component:BookEditComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"admin-libros", component:AdminLibrosComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  {path:"admin-generos", component: AdminGenerosComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  {path:"admin-usuarios", component:AdminUsuariosComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  {path:"search/:busqueda", component:BookSearcherComponent},
  {path:"**", pathMatch:"full", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
