"use client";

import { useEffect, useState } from "react";
import { Persona } from "@/types/persona"
import { getPersona, desactivarPersona } from "@/services/persona.service";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";

export default function PersonaPage() {
    const [persona, setPersona] = useState<Persona[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { canManagePersonas, canCreatePersonas, canEditPersonas, canDeletePersonas } = usePermissions();

    useEffect(() => {
        cargarPersonas();
    }, []);

    async function cargarPersonas() {
        setLoading(true);
        try {
            const data = await getPersona();
            setPersona(data || []);
        } catch (error) {
            console.error("Error al cargar personas:", error);
            setPersona([]);
        } finally {
            setLoading(false);
        }
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Estás seguro de que deseas desactivar a esta persona?")) return;
        try {
            await desactivarPersona(id);
            cargarPersonas();
        } catch (error) {
            console.error("Error al desactivar persona:", error);
        }
    }

    function handleEditar(id: number) {
        router.push(`/personas/editar/${id}`);
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando personas</p>;
    }

    // Verificar permisos básicos para ver la página
    if (!canManagePersonas()) {
        return (
            <div className="page">
                <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
                <p className="mt-4">No tienes permisos para ver esta página.</p>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Personas</h1>

                <div className="flex items-center space-x-4">
                    {canCreatePersonas() && (
                        <button
                            onClick={() => router.push("/personas/crear")}
                            className="btn-primary"
                        >
                            Nueva Persona
                        </button>
                    )}

                    <button
                        onClick={() => router.push("/personas/desactivadas")}
                        className="btn-secondary"
                    >
                        Personas Desactivadas
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {persona.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    No hay personas registradas
                                </td>
                            </tr>
                        ) : (
                        persona.map((p) => (
                            <tr key={p.idPersona}>
                                <td>{p.nombre ? `${p.nombre} ${p.apellido || ''}` : 'Sin nombre'}</td>
                                <td>{p.documento || 'Sin documento'}</td>
                                <td>{p.rol?.nombre || 'Sin rol'}</td>
                                <td>
                                    {p.estado ? (
                                        <span className="badge-active">Activo</span>
                                    ) : (
                                        <span className="badge-inactive">Inactivo</span>
                                    )}
                                </td>
                                <td className="actions">
                                    <button
                                        className="btn-view"
                                        onClick={() => router.push(`/personas/ver/${p.idPersona}`)}
                                    >
                                        Ver
                                    </button>

                                    {canEditPersonas() && (
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEditar(p.idPersona)}
                                        >
                                            Editar
                                        </button>
                                    )}

                                    {canDeletePersonas() && (
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleEliminar(p.idPersona)}
                                        >
                                            Desactivar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}