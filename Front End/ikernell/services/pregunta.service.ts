import { Pregunta, Respuesta } from "@/types/pregunta";

const API_URL = "http://localhost:8080/api/preguntas";

export async function getPreguntas(): Promise<Pregunta[]> {
    const res = await fetch(API_URL);

    if (!res.ok) {
        throw new Error("Error al obtener las preguntas");
    }
    
    return res.json();
}

export async function getPreguntasPorEstado(estado: 'abierta' | 'respondida' | 'cerrada'): Promise<Pregunta[]> {
    const res = await fetch(`${API_URL}?estado=${estado}`);

    if (!res.ok) {
        throw new Error("Error al obtener preguntas");
    }
    
    return res.json();
}

export async function crearPregunta(data: {
    titulo: string;
    contenido: string;
    autor?: string;
}): Promise<Pregunta> {

    if (!data.contenido.trim()) {
        throw new Error("La descripcion no puede estar vacia")
    }

    const res = await fetch("http://localhost:8080/api/preguntas", {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: data.titulo,
            descripcion: data.contenido,
            autor: data.autor,
        }),
    });

    if (!res.ok) {
        throw new Error("Error al crear pregunta");
    }
    
    return res.json();
}

export async function responderPregunta(idPregunta: number, data: { contenido: string; autor: string }) {
    const res = await fetch(`${API_URL}/${idPregunta}/respuestas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contenido: data.contenido,
            autor: data.autor,
        }),
    });

    if (!res.ok) {
        throw new Error("Error al responder pregunta");
    }
    
    return res.json();
}


export async function eliminarPregunta(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error("Error al eliminar pregunta");
    }
}

export async function eliminarRespuesta(idPregunta: number, indexRespuesta: number): Promise<void> {
    const res = await fetch(`${API_URL}/${idPregunta}/respuestas/${indexRespuesta}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error("Error al eliminar la respuesta");
    }
}
