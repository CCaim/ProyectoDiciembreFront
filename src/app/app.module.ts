import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FooterComponent } from './components/shared/footer/footer.component';

import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';
import { AdminGenerosComponent } from './components/admin/admin-generos/admin-generos.component';
import { AdminLibrosComponent } from './components/admin/admin-libros/admin-libros.component';

import { BookComponent } from './components/book/book.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookSearcherComponent } from './components/book-searcher/book-searcher.component';
import { BooksComponent } from './components/books/books.component';
import { BookCardComponent } from './components/shared/book-card/book-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    AdminUsuariosComponent,
    FooterComponent,
    BooksComponent,
    BookCardComponent,
    BookSearcherComponent,
    BookFormComponent,
    BookEditComponent,
    BookComponent,
    AdminLibrosComponent,
    AdminGenerosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxDropzoneModule
  ],
  bootstrap: [AppComponent] // Asegúrate de agregar esto
})
export class AppModule { }
