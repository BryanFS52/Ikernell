import { Persona } from "./persona";
import { Proyecto } from "./proyecto";

export interface Interrupcion {
    idInterrupcion: number;
    tipo: string;
    fecha: string;
    duracion: string;
    fase: string;
    persona?: Persona;
    proyecto?: Proyecto;
}
