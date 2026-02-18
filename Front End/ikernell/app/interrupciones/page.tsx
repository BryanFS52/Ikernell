"use client";

import { useEffect, useState } from "react";
import { Interrupcion } from "@/types/interrupcion";
import { getInterrupciones, eliminarInterrupcion } from "@/services/interrupcion.service";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";
import { ConditionalRender } from "@/components/ConditionalRender";
import { useAuth } from "@/app/context/AuthContext";


export default function InterrupcionesPage() {
    const [interrupciones, setInterrupciones] = useState<Interrupcion[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { usuario } = useAuth();
    const {
        canRegisterInterruptions,
        canViewAllInterruptions,
        isDesarrollador
    } = usePermissions();

    useEffect(() => {
        cargarInterrupciones();
    }, []);

    async function cargarInterrupciones() {
        setLoading(true);
        try {
            const data = await getInterrupciones();
            
            let interrupcionesFiltradas = data || [];
            
            // Si es desarrollador, solo mostrar interrupciones de proyectos donde esté asignado
            if (isDesarrollador() && usuario) {
                interrupcionesFiltradas = (data || []).filter(interrupcion => 
                    interrupcion.proyecto?.personas?.some(persona => 
                        persona.idPersona === usuario.idPersona
                    )
                );
            }
            
            setInterrupciones(interrupcionesFiltradas);
        } catch (error) {
            console.error("Error al cargar interrupciones:", error);
            setInterrupciones([]);
        } finally {
            setLoading(false);
        }
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Estás seguro de que deseas eliminar esta interrupción?")) return;
        try {
            await eliminarInterrupcion(id);
            cargarInterrupciones();
        } catch (error) {
            console.error("Error al eliminar interrupción:", error);
        }
    }

    function handleEditar(id: number) {
        router.push(`/interrupciones/editar/${id}`);
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando interrupciones</p>;
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Interrupciones</h1>

                <div className="flex items-center space-x-4">
                    <ConditionalRender condition={canRegisterInterruptions()}>
                        <button
                            onClick={() => router.push("/interrupciones/crear")}
                            className="btn-primary"
                        >
                            Nueva Interrupción
                        </button>
                    </ConditionalRender>
                </div>
            </div>

            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th>Duracion</th>
                            <th>Fase</th>
                            <th>Responsable</th>
                            <th>Proyecto</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {interrupciones.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    No se encontraron interrupciones
                                </td>
                            </tr>
                        ) : (
                            interrupciones.map((i) => (
                                <tr key={i.idInterrupcion}>
                                    <td>{i.tipo}</td>
                                    <td>{new Date(i.fecha).toLocaleDateString()}</td>
                                    <td>{i.duracion}</td>
                                    <td>{i.fase}</td>
                                    <td>{i.persona ? `${i.persona.nombre} ${i.persona.apellido}` : 'Sin nombre'}</td>
                                    <td>{i.proyecto ? i.proyecto.nombre : 'No asignado'}</td>
                                    <td className="actions">
                                        <ConditionalRender condition={canViewAllInterruptions()}>
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEditar(i.idInterrupcion)}
                                            >
                                                Editar
                                            </button>
                                        </ConditionalRender>
                                        
                                        <ConditionalRender condition={canViewAllInterruptions()}>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleEliminar(i.idInterrupcion)}
                                            >
                                                Eliminar
                                            </button>
                                        </ConditionalRender>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}