import { Persona } from "./persona";
import { Proyecto } from "./proyecto";

export interface ErrorProyecto {
    idError: number;
    tipoError: string;
    fase: string;
    persona: Persona;
    proyecto: Proyecto
}