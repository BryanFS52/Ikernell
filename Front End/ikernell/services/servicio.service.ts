import { Servicio } from "@/types/servicio";

const API_URL = "http://localhost:8080/api/servicios";

export async function getServicios(): Promise<Servicio[]> {
        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("Error al obtener los servicios");
        }

        return res.json();
    }

export async function eliminarServicio(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error("Error al eliminar servicio");
    }
}

