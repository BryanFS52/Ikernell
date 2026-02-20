import { Persona } from "@/types/persona";

const API_URL = "http://localhost:8080/api/personas";

export async function getPersona(): Promise<Persona[]> {
    const res = await fetch(API_URL);

    if (!res.ok) {
        throw new Error("Error al obtener personas");
    }

    return res.json();
}

export async function getPersonasDesactivadas(): Promise<Persona[]> {
    const res = await fetch(`${API_URL}/desactivadas`);

    if (!res.ok) {
        throw new Error("Error al obtener personas desactivadas");
    }

    return res.json();
}

export async function getPersonasAsignables(): Promise<Persona[]> {
    const res = await fetch("http://localhost:8080/api/personas/asignables");

    if (!res.ok) {
        throw new Error("Error al obtener personas asignables");
    }

    return res.json();
}

export async function desactivarPersona(id: number) {
    const res = await fetch(`${API_URL}/desactivar/${id}`, {
        method: 'PUT',
    });

    if (!res.ok) {
        throw new Error("Error al desactivar persona");
    }
}

export async function reactivarPersona(id: number) {
    const res = await fetch(`${API_URL}/reactivar/${id}`, {
        method: 'PUT',
    });

    if (!res.ok) {
        throw new Error("Error al reactivar persona");
    }
}

export async function crearPersona(persona: any): Promise<Persona> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(persona),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al crear persona: ${res.status} - ${errorText}`);
    }

    return res.json();
}

export async function actualizarPersona(id: number, persona: any): Promise<Persona> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(persona),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al actualizar persona: ${res.status} - ${errorText}`);
    }

    return res.json();
}

export async function getPersonaPorId(id: number): Promise<Persona> {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
        throw new Error("Error al obtener persona por ID");
    }

    return res.json();
}

export async function verPersona(idPersona:number): Promise<Persona> {
    try{
        const res = await fetch(`${API_URL}/${idPersona}`);

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error en ver persona", error);
        throw new Error("Error al obtener persona desde el servidor");
    }
}

export async function getProyectosDePersona(idPersona: number) {
    try {
        // Obtener todos los proyectos
        const res = await fetch(`http://localhost:8080/api/proyectos`);
        
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const todosLosProyectos = await res.json();
        
        // Filtrar proyectos que contengan a esta persona
        const proyectosDeLaPersona = todosLosProyectos.filter((proyecto: any) => {
            return proyecto.personas && proyecto.personas.some((persona: any) => 
                persona.idPersona === idPersona
            );
        });

        return proyectosDeLaPersona;
    } catch (error) {
        console.error("Error al obtener proyectos de persona:", error);
        return [];
    }
}