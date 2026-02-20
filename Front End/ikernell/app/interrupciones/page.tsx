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
        return <p className="text-center mt-10">Cargando interrupciones...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Interrupciones</h1>

                <div className="flex gap-2">
                    <ConditionalRender condition={canRegisterInterruptions()}>
                        <button
                            onClick={() => router.push("/interrupciones/crear")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Nueva Interrupción
                        </button>
                    </ConditionalRender>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Tipo</th>
                            <th className="px-6 py-3">Fecha</th>
                            <th className="px-6 py-3">Duración</th>
                            <th className="px-6 py-3">Fase</th>
                            <th className="px-6 py-3">Responsable</th>
                            <th className="px-6 py-3">Proyecto</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {interrupciones.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    No se encontraron interrupciones
                                </td>
                            </tr>
                        ) : (
                            interrupciones.map((i) => (
                                <tr key={i.idInterrupcion} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{i.tipo}</td>
                                    <td className="px-6 py-4">{new Date(i.fecha).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{i.duracion}</td>
                                    <td className="px-6 py-4">{i.fase}</td>
                                    <td className="px-6 py-4">{i.persona ? `${i.persona.nombre} ${i.persona.apellido}` : 'Sin nombre'}</td>
                                    <td className="px-6 py-4">{i.proyecto ? i.proyecto.nombre : 'No asignado'}</td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <ConditionalRender condition={canViewAllInterruptions()}>
                                            <button
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                                onClick={() => handleEditar(i.idInterrupcion)}
                                            >
                                                Editar
                                            </button>
                                        </ConditionalRender>

                                        <ConditionalRender condition={canViewAllInterruptions()}>
                                            <button
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
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