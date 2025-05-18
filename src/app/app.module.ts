import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { interceptorProvider } from './services/interceptor.service';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';

import { BuscadorLibroComponent } from './components/buscador-libro/buscador-libro.component';

import { AdminGenerosComponent } from './components/admin/admin-generos/admin-generos.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AdminLibrosComponent } from './components/admin/admin-libros/admin-libros.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookCardComponent } from './components/shared/book-card/book-card.component';
import { BookComponent } from './components/book/book.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    AdminUsuariosComponent,
    BuscadorLibroComponent,

    AdminGenerosComponent,
    BookFormComponent,
    AdminLibrosComponent,
    BookEditComponent,
    BookCardComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    NgxPaginationModule,
    NgxDropzoneModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
