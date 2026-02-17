import { Persona } from '@/types/persona';
import { CredencialesLogin } from '@/types/auth';

const API_URL = 'http://localhost:8080/api/personas';

export async function loginPersona(credenciales: CredencialesLogin) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credenciales),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error al iniciar sesión');
    }

    return res.json() as Promise<Persona>;
}

export async function crearPersonaConCredenciales(data: Partial<Persona> & { usuario: string; contraseña: string }) {
    const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error al crear usuario');
    }

    return res.json() as Promise<Persona>;
}

export async function actualizarPersonaConCredenciales(id: number, data: Partial<Persona>) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error al actualizar usuario');
    }

    return res.json() as Promise<Persona>;
}
