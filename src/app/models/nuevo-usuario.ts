export class NuevoUsuario {
    username: string;
    password: string;
    email:string;
    roles?: string[];

    constructor(nombreUsuario: string, email: string, password: string, rols?:string[]) {
        this.username = nombreUsuario;
        this.email = email;
        this.password = password;
        this.roles= rols;
    }
}
