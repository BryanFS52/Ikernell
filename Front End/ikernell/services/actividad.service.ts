import { Actividad } from "@/types/actividad";

const API_URL = "http://localhost:8080/api/actividades";

export async function getActividades(): Promise<Actividad[]> {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener actividades");
    return res.json();
}


export async function eliminarActividad(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error("Error al eliminar actividad");
    }
}
