import { Proyecto} from "@/types/proyecto";
import { Persona } from "@/types/persona";

const API_URL = "http://localhost:8080/api/proyectos";

export async function getProyecto(): Promise<Proyecto[]> {
        const res = await fetch(`${API_URL}`);

        if (!res.ok) {
            throw new Error(`Error ${res.status}`);
        }
        return res.json();
    }


export async function crearProyecto(proyecto: Omit<Proyecto, 'idProyecto'>): Promise<Proyecto> {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyecto)
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error en crearProyecto:", error);
        throw new Error("Error al crear proyecto en el servidor");
    }
}

export async function getProyectosDesactivados(): Promise<Proyecto[]> {
    try {
        const res = await fetch(`${API_URL}/desactivados`);

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error en getProyectosDesactivados:", error);
        throw new Error("Error al obtener proyectos desactivados desde el servidor");
    }
}

export async function verProyecto(idProyecto: number): Promise<Proyecto> {
    try {
        const res = await fetch(`${API_URL}/${idProyecto}`);

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error en verProyecto:", error);
        throw new Error("Error al obtener proyecto desde el servidor");
    }
}

export async function desactivarProyecto(idProyecto: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/desactivar/${idProyecto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
    } catch (error) {
        console.error("Error en desactivarProyecto:", error);
        throw new Error("Error al desactivar proyecto en el servidor");
    }
}

export async function reactivarProyecto(idProyecto: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/reactivar/${idProyecto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
    } catch (error) {
        console.error("Error en reactivarProyecto:", error);
        throw new Error("Error al reactivar proyecto en el servidor");
    }
}

export async function asignarDesarrollador(idProyecto: number, idPersona: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/asignar/${idProyecto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idPersona }),
        });
            
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
    } catch (error) {
        console.error("Error en asignarDesarrollador:", error);
        throw new Error("Error al asignar desarrollador al proyecto en el servidor");
    }
}


