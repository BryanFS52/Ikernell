import {Rol} from './rol';
import {Proyecto} from './proyecto';

export interface Persona {
    idPersona: number;
    nombre: string;
    apellido: string;
    documento: string;
    direccion?: string;
    profesion?: string;
    especialidad?: string;
    estado: boolean;
    foto?: string;
    fechaNacimiento?: string;
    rol: Rol;
    proyecto?: Proyecto;
    password?: string;
}

export interface PersonaFormData {
    nombre: string;
    apellido: string;
    documento: string;
    direccion?: string;
    profesion?: string;
    especialidad?: string;
    estado: boolean;
    password?: string;
    foto?: string;
    idRol: string;
}