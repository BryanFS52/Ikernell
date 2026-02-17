import { Rol } from "@/types/rol";

const API_URL = "http://localhost:8080/api/roles";

export async function getRoles(): Promise<Rol[]> {
    const res = await fetch(API_URL);
    
    if (!res.ok) throw new Error("Error al obtener roles");
    return res.json();
}

export async function crearRol(nombre: string): Promise<Rol> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre })
    });

    if (!res.ok) throw new Error("Error al crear el rol");
    return res.json();
}

export async function eliminarRol(id: number) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}