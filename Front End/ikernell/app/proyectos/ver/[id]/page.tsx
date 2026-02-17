"use client";

import { useEffect, useState} from "react";
import { useParams, useRouter} from "next/navigation";
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
        <div className="page max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
                Detalles del Proyecto
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">{proyecto.nombre}</h2>
                <p className="text-gray-700">{proyecto.descripcion}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mt-4">
                    <div className="bg-gray-50 p-4 rounded shadow-sm">
                        <h3 className="font-medium text-gray-700 mb-1">Fecha de Inicio</h3>
                        <p>{new Date(proyecto.fechaInicio).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded shadow-sm">
                        <h3 className="font-medium text-gray-700 mb-1">Fecha de Fin</h3>
                        <p>{new Date(proyecto.fechaFin).toLocaleDateString()}</p>
                    </div>
                    {proyecto.personas && proyecto.personas.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded shadow-sm sm:col-span-2">
                            <h3 className="font-medium text-gray-700 mb-1">
                                Desarrollador Asignado
                            </h3>

                            <ul className="list-disc list-inside space-y-1">
                                {proyecto.personas.map((persona) => (
                                    <li key={persona.idPersona}>
                                        {persona.nombre} {persona.apellido}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }
                </div>
                <div>
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            proyecto.estado
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {proyecto.estado ? "Activo" : "Inactivo"}
                    </span>
                </div>
            </div>
            <div className="mt-6 flex justify-start">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Volver
                </button>
            </div>
        </div>
    );
}

