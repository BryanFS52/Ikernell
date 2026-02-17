import { Persona } from './persona';

export interface Pregunta {
    idPregunta: number;
    titulo: string;
    descripcion: string;
    persona?: Persona;
    autor?: string;
    fecha: string;
    respuestas?: string[];
}

export interface Respuesta {
    idRespuesta: number;
    descripcion: string;
    pregunta: Pregunta;
    respuesta: Respuesta;
    fecha: string;
}