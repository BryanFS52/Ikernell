"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Actividad } from "@/types/actividad";
import { Proyecto } from "@/types/proyecto";
import { useAuth } from "@/app/context/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { getProyecto } from "@/services/proyecto.service";

export default function VerActividadPage() {
    const [actividad, setActividad] = useState<Actividad | null>(null);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const { usuario } = useAuth();
    const { isDesarrollador } = usePermissions();
    const id = params.id as string;

    useEffect(() => {
        // Verificar que el usuario sea desarrollador
        if (!isDesarrollador()) {
            router.push("/actividades");
            return;
        }
        cargarDatos();
    }, [id, isDesarrollador]);

    async function cargarDatos() {
        try {
            // Cargar actividad y proyectos
            const [actividadRes, proyectosData] = await Promise.all([
                fetch(`http://localhost:8080/api/actividades/${id}`),
                getProyecto()
            ]);

            if (actividadRes.ok) {
                const actividadData = await actividadRes.json();
                
                // Verificar que la actividad esté asignada al desarrollador actual
                if (actividadData.persona?.idPersona !== usuario?.idPersona) {
                    router.push("/actividades");
                    return;
                }
                
                setActividad(actividadData);
            } else {
                console.error("Error al cargar actividad");
                router.push("/actividades");
                return;
            }

            setProyectos(proyectosData);

        } catch (error) {
            console.error("Error:", error);
            router.push("/actividades");
        } finally {
            setLoading(false);
        }
    }

    function encontrarProyectoDePersona(idPersona: number) {
        const proyecto = proyectos.find(p =>
            p.personas && p.personas.some(persona => persona.idPersona === idPersona)
        );
        return proyecto ? proyecto.nombre : "Sin proyecto asignado";
    }

    function obtenerNombreProyecto() {
        if (actividad?.proyecto?.nombre) {
            return actividad.proyecto.nombre;
        }
        if (actividad?.persona?.idPersona) {
            return encontrarProyectoDePersona(actividad.persona.idPersona);
        }
        return "Sin proyecto asignado";
    }

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando mi actividad...</p>
                </div>
            </div>
        );
    }

    if (!actividad) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-2">Actividad no disponible</p>
                    <p className="text-gray-400 text-sm mb-6">
                        Solo puedes ver actividades que estén asignadas a ti
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {actividad.nombre}
                    </h1>
                    <p className="text-gray-600 mt-1">Detalles de la actividad</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        actividad.estado === 'CIERRE'
                            ? 'bg-green-100 text-green-800'
                            : actividad.estado === 'EJECUCION'
                            ? 'bg-blue-100 text-blue-800'
                            : actividad.estado === 'PLANIFICACION'
                            ? 'bg-yellow-100 text-yellow-800'
                            : actividad.estado === 'INICIACION'
                            ? 'bg-purple-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                        {actividad.estado}
                    </span>
                    <button
                        onClick={() => router.push("/actividades")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Volver
                    </button>
                </div>
            </div>

            {/* Información de la actividad para el desarrollador */}
            <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                
                {/* Descripción principal */}
                <div className="p-6">
                    <div className="space-y-4">
                        <div>
                            <span className="text-xl font-semibold text-gray-900">Actividad:</span>
                        </div>
                        <div className="pl-4">
                            <p className="text-gray-600 font-medium">{actividad.nombre}</p>
                        </div>
                        
                        {actividad.descripcion && (
                            <>
                                <div className="mt-4">
                                    <span className="text-xl font-semibold text-gray-900">Detalles:</span>
                                </div>
                                <div className="pl-4">
                                    <p className="text-gray-600 leading-relaxed">
                                        {actividad.descripcion}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Información del proyecto */}
                    <div className="mt-8 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Proyecto</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Proyecto
                                </label>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-900">
                                        {obtenerNombreProyecto()}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Etapa
                                </label>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-900">
                                        {actividad.etapa?.nombre || "Sin etapa definida"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desarrollador asignado */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Desarrollador Asignado</h3>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-900">
                                {actividad.persona
                                    ? `${actividad.persona.nombre} ${actividad.persona.apellido}`
                                    : "Sin asignar"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}