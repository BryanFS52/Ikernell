import { Etapa } from "@/types/etapa";
import { Proyecto } from "@/types/proyecto";

const API_URL = "http://localhost:8080/api/etapas";

export async function getEtapas(): Promise<Etapa[]> {
    const res = await fetch(API_URL);

    if (!res.ok) {
        throw new Error("Error al obtener etapas");
    }

    return res.json();
}

export async function eliminarEtapa(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error("Error al eliminar etapa");
    }
}