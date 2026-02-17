"use client";

import { useEffect, useState } from "react";
import { Persona } from "@/types/persona";
import { getPersonasDesactivadas, reactivarPersona } from "@/services/persona.service";
import { useRouter } from "next/navigation";

export default function PersonasDesactivadasPage() {
    const [persona, setPersona] = useState<Persona[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        cargarPersonasDesactivadas();
    }, []);

    async function cargarPersonasDesactivadas() {
        setLoading(true);
        try {
            const data = await getPersonasDesactivadas();
            setPersona(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleReactivar(id: number) {
        await reactivarPersona(id);
        cargarPersonasDesactivadas();
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando personas desactivadas...</p>;
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Personas Desactivadas</h1>

                <button
                    onClick={() => router.push("/personas")}
                    className="btn-primary"
                >
                    Personas Activas
                </button>
            </div>

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {persona.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-4">
                                No hay personas desactivadas
                            </td>
                        </tr>
                    ) : (
                        persona.map((p) => (
                            <tr key={p.idPersona}>
                                <td>{p.nombre ? `${p.nombre} ${p.apellido || ''}` : 'Sin nombre'}</td>
                                <td>{p.documento || 'Sin documento'}</td>
                                <td>{p.rol?.nombre || 'Sin rol'}</td>
                                <td>
                                    <span className="badge-inactive">Inactivo</span>
                                </td>
                                <td>
                                    <button
                                        className="btn-primary"
                                        onClick={() => handleReactivar(p.idPersona)}
                                    >
                                        Reactivar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
