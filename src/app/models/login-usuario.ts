export class LoginUsuario {
    username: string;
    password: string;
    
    constructor(nombreUsuario:string, contra:string){
        this.username = nombreUsuario;
        this.password = contra;
    }
}
