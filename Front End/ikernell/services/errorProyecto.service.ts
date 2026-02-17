import { ErrorProyecto } from "@/types/errorProyecto";

const API_URL = "http://localhost:8080/api/errores";

export async function getErrorProyectos(): Promise<ErrorProyecto[]> {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            if (res.status === 404) {
                return [];
            }
            throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error("Servidor no disponible. Verifica que el backend esté ejecutándose.");
        }
        throw error;
    }
}

export async function getErrorProyectoDesactivados(): Promise<ErrorProyecto[]> {
    const res = await fetch(`${API_URL}/desactivar`);

        if (!res.ok) {
            throw new Error("Error al obtener errores en los proyectos");
        }

        return res.json();
}

export async function crearErrorProyecto(errorData: {
    tipoError: string;
    fase: string;
    idPersona: number;
    idProyecto: number;
}): Promise<void> {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(errorData)
        });

        if (!res.ok) {
            throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
        }
    }


export async function desactivarErrorProyecto(id: number) {
    const res = await fetch(`${API_URL}/desactivar/${id}`, {
        method: 'PUT',
    });

    if (!res.ok) {
        throw new Error("Error al desactivar error de proyecto");
    }
}


export async function reactivarErrorProyecto(id: number) {
    const res = await fetch(`${API_URL}/reactivar/${id}`, {
        method: 'PUT',
    });

    if (!res.ok) {
        throw new Error("Error al reactivar error de proyecto");
    }
}

export async function actualizarErrorProyecto(id: number, errorData: {
    tipoError: string;
    fase: string;
    idPersona: number;
    idProyecto: number;
}): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorData)
    });

    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
    }
}


export async function eliminarErrorProyecto(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error("Error al eliminar error de proyecto");
    }
}