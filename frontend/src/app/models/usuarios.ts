export class Usuario {
    _id!:string;
    apellido!: string;
    email!: string | null;;
    event!: string;
    identificacion!: string;
    nombre!: string;
    password!: string;
    role!: string;
    status!: string;
    times!: string;
  
    constructor() {
      this.apellido = "";
      this.email = "";
      this.event = "";
      this.identificacion = "";
      this.nombre = "";
      this.password = "";
      this.role = "";
      this.status = "";
      this.times = "";
    }
  }
  
