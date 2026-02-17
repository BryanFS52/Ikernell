import { Persona } from "./persona";

export interface Proyecto {
    idProyecto: number;
    nombre: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    estado: boolean;
    personas?: Persona[];
}
