"use client";

import { useEffect, useState } from "react";
import { Actividad } from "@/types/actividad";
import { getActividades, eliminarActividad } from "@/services/actividad.service";
import { useRouter } from "next/navigation";
import { Proyecto } from "@/types/proyecto";
import { getProyecto } from "@/services/proyecto.service";
import { EstadoActividad } from "@/types/actividad";
import { usePermissions } from "@/hooks/usePermissions";
import { ConditionalRender } from "@/components/ConditionalRender";
import { useAuth } from "@/app/context/AuthContext";

export default function ActividadesPage() {
    const [actividad, setActividad] = useState<Actividad[]>([]);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { usuario } = useAuth();
    const {
        canCreateActivities,
        canCompleteOwnActivities,
        canCompleteAllActivities,
        canViewAllProjects,
        isDesarrollador
    } = usePermissions();

    useEffect(() => {
        cargarActividades();
        cargarProyectos();
    }, []);

    async function cargarProyectos() {
        try {
            const data = await getProyecto();
            setProyectos(data);
            console.log("Proyectos cargados:", data);
        } catch (error) {
            console.error("Error al cargar proyectos:", error);
        }
    }

    async function cargarActividades() {
        setLoading(true);
        try {
            const data = await getActividades();

            let actividadesFiltradas = data;

            // Si es desarrollador, solo mostrar actividades asignadas a él
            if (isDesarrollador() && usuario) {
                actividadesFiltradas = data.filter(actividad =>
                    actividad.persona?.idPersona === usuario.idPersona
                );
            }

            setActividad(actividadesFiltradas);

        } catch (error) {
            console.error("Error al cargar actividades:", error);
        } finally {
            setLoading(false);
        }
    }

    function encontrarProyectoDePersona(idPersona: number) {
        const proyecto = proyectos.find(p =>
            p.personas && p.personas.some(persona => persona.idPersona === idPersona)
        );
        return proyecto ? proyecto.nombre : "Sin proyecto";
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Estás seguro de que deseas eliminar esta actividad?")) return;
        try {
            await eliminarActividad(id);
            cargarActividades();
        } catch (error) {
            console.error("Error al eliminar actividad:", error);
        }
    }

    async function marcarActividadFinalizada(id: number) {
        try {
            const res = await fetch(`http://localhost:8080/api/actividades/${id}/finalizar`, {
                method: 'PUT',
            });
            if (res.ok) {
                cargarActividades();
            } else {
                console.error('Error al finalizar actividad', await res.text());
            }
        } catch (error) {
            console.error("Error al finalizar actividad:", error);
        }
    }

    function handleEditar(id: number) {
        router.push(`/actividades/editar/${id}`);
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando actividades</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Actividades</h1>

                <ConditionalRender condition={canCreateActivities()}>
                    <button
                        onClick={() => router.push("/actividades/crear")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Nueva Actividad
                    </button>
                </ConditionalRender>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Proyecto</th>
                            <th className="px-6 py-3">Asignado</th>
                            <th className="px-6 py-3">Etapa</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {actividad.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No hay actividades registradas
                                </td>
                            </tr>
                        ) : (
                            actividad.map((act) => (
                                <tr key={act.idActividad} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{act.nombre}</td>

                                    <td className="px-6 py-4">
                                        {act.proyecto?.nombre ??
                                            (act.persona
                                                ? encontrarProyectoDePersona(act.persona.idPersona)
                                                : "Sin proyecto")}
                                    </td>

                                    <td className="px-6 py-4">
                                        {act.persona
                                            ? `${act.persona.nombre} ${act.persona.apellido}`
                                            : "Sin asignar"}
                                    </td>

                                    <td className="px-6 py-4">{act.estado}</td>

                                    <td className="px-6 py-4 text-center space-x-2">
                                        <ConditionalRender condition={canCreateActivities()}>
                                            <button
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                                onClick={() => handleEditar(act.idActividad)}
                                            >
                                                Editar
                                            </button>
                                        </ConditionalRender>

                                        <ConditionalRender condition={canCreateActivities()}>
                                            <button
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                                onClick={() => handleEliminar(act.idActividad)}
                                            >
                                                Eliminar
                                            </button>
                                        </ConditionalRender>

                                        {act.estado !== EstadoActividad.CIERRE && (
                                            <ConditionalRender
                                                condition={
                                                    canCompleteAllActivities() ||
                                                    (canCompleteOwnActivities() &&
                                                        act.persona?.idPersona === usuario?.idPersona)
                                                }
                                            >
                                                <button
                                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                                    onClick={() => marcarActividadFinalizada(act.idActividad)}
                                                >
                                                    Finalizar
                                                </button>
                                            </ConditionalRender>
                                        )}
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
