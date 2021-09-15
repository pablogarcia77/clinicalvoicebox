import { Paciente } from "./paciente";
import { Terapeuta } from "./terapeuta";

export class Persona {

    id: number;
    apellido: string;
    nombre: string;
    sexo: string;
    documento: string;
    domicilio: string;
    email: string;
    telefono: string;
    fecha_nacimiento: Date;
    terapeuta: Terapeuta;
    pais: number;
    paciente: Paciente;
    
    constructor(){}
}
