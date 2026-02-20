"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { verProyecto } from "@/services/proyecto.service";
import { Persona } from "@/types/persona";

export interface Proyecto {
    idProyecto: number;
    nombre: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    estado: boolean;
    personas?: Persona[];
}


export default function VerProyectosPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [proyecto, setProyecto] = useState<Proyecto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarProyecto();
    }, []);

    async function cargarProyecto() {
        setLoading(true);
        try {
            const proyectoData = await verProyecto(Number(id));
            setProyecto(proyectoData);
        } catch (error) {
            console.error("Error al cargar proyectos:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando proyectos...</p>;
    }

    if (!proyecto) {
        return <p className="text-center mt-10">Proyecto no encontrado.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b bg-gray-50">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {proyecto.nombre}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Detalles del proyecto
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <span
                                className={`px-4 py-1 text-sm font-semibold rounded-full ${proyecto.estado
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {proyecto.estado ? "Activo" : "Inactivo"}
                            </span>
                            
                            <button
                                onClick={() => router.back()}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                <div className="p-8 space-y-10">

                    {/* Descripción */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                            Descripción
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {proyecto.descripcion}
                        </p>
                    </section>

                    {/* Fechas */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Fechas
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-5 rounded-xl border">
                                <p className="text-sm text-gray-500">Fecha de inicio</p>
                                <p className="text-lg font-semibold text-gray-800 mt-1">
                                    {new Date(proyecto.fechaInicio).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl border">
                                <p className="text-sm text-gray-500">Fecha de finalización</p>
                                <p className="text-lg font-semibold text-gray-800 mt-1">
                                    {new Date(proyecto.fechaFin).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Personas */}
                    {proyecto.personas && proyecto.personas.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                Desarrolladores asignados
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {proyecto.personas.map((persona) => (
                                    <div
                                        key={persona.idPersona}
                                        className="bg-gray-50 border rounded-xl p-4 hover:shadow-md transition"
                                    >
                                        <p className="font-medium text-gray-800">
                                            {persona.nombre} {persona.apellido}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    );
}

