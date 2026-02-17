import { Interrupcion } from "@/types/interrupcion";
import { Persona } from "@/types/persona";
import { Proyecto } from "@/types/proyecto";

const API_URL = "http://localhost:8080/api/interrupciones";

export async function getInterrupciones(): Promise<Interrupcion[]> {
    const res = await fetch(API_URL);
    
    if (!res.ok) {
        throw new Error("Error al obtener las interrupciones");
    }

    return res.json();
}

export async function crearInterrupcion(interrupcion: any): Promise<Interrupcion> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(interrupcion),
    });

    if (!res.ok) {
        throw new Error("Error al crear interrupción");
    }

    return res.json();
}


export async function actualizarInterrupcion(id: number, interrupcion: any): Promise<Interrupcion> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(interrupcion),
    });

    if (!res.ok) {
        throw new Error("Error al actualizar interrupción");
    }

    return res.json();
}

export async function eliminarInterrupcion(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error("Error al eliminar interrupción");
    }
}

export async function getInterrupcionPorId(id: number): Promise<Interrupcion> {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
        throw new Error("Error al obtener interrupción por ID");
    }

    return res.json();
}