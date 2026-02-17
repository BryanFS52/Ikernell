import { Persona } from "./persona";
import { Proyecto } from "./proyecto";
import { Actividad } from "./actividad";
import { ErrorProyecto } from "./errorProyecto";
import { Interrupcion } from "./interrupcion";

export interface Reporte {
    idReporte: number;
    nombre: string;
    tipo: TipoReporte;
    fechaCreacion: string;
    fechaInicio?: string;
    fechaFin?: string;
    descripcion?: string;
    datos: any; // Contendrá los datos específicos del reporte
}

export type TipoReporte =
    | "Reporte de desempeño"
    | "Reportes por actividad por proyecto"
    | "Reporte de interrupciones"
    | "Archivo plano para empresa brasileña";
