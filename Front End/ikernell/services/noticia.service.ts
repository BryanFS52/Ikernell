import { Noticia } from "@/types/noticia";

const API_URL = "http://localhost:8080/api/noticias";

export async function getNoticias(): Promise<Noticia[]> {
    const res = await fetch("http://localhost:8080/api/noticias/ultimas");

    if (!res.ok) {
        throw new Error("Error al obtener las noticias");
    }

    return res.json();
}

export async function getNoticia(): Promise<Noticia[]> {
    return getNoticias();
}

export async function crearNoticia(data: {
    titulo: string;
    contenido: string;
}): Promise<Noticia> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Error al crear noticia");
    }

    return res.json();
}

export async function actualizarNoticia(id: number, data: {
    titulo?: string;
    contenido?: string;
}): Promise<Noticia> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Error al actualizar noticia");
    }

    return res.json();
}

export async function eliminarNoticia(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error("Error al eliminar noticia");
    }
}