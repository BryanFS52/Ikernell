import { Etapa } from "./etapa";
import { Persona } from "./persona";
import { Proyecto } from "./proyecto";


export enum EstadoActividad {
    INICIACION = "INICIACION",
    PLANIFICACION = "PLANIFICACION",
    EJECUCION = "EJECUCION",
    SEGUIMIENTO = "SEGUIMIENTO",
    CIERRE = "CIERRE",
}

export interface Actividad {
    idActividad: number;
    nombre: string;
    descripcion?: string;
    estado: EstadoActividad;
    persona: Persona;
    etapa: Etapa;
    proyecto: Proyecto;
}
